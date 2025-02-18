const client = require('../db');

const addNewCustomer = async (req, res) => {
  const { accountId, introducerId } = req.body;

  if (!accountId || !introducerId) {
    return res
      .status(400)
      .json({ message: 'accountId and introducerId are required' });
  }

  if (accountId === introducerId) {
    return res
      .status(400)
      .json({ message: 'accountId and introducerId cannot be the same' });
  }

  try {
    await client.query('BEGIN');

    const customerResult = await createNewCustomerRecord(
      accountId,
      introducerId
    );

    if (customerResult.error) {
      await client.query('ROLLBACK');
      return res
        .status(customerResult.status || 500)
        .json({ message: customerResult.message });
    }

    const beneficiaryResult = await updateBeneficiaryAndCount(
      introducerId,
      accountId
    );

    if (beneficiaryResult.error) {
      console.error('Error updating beneficiary:', beneficiaryResult.message);
      await client.query('ROLLBACK');
      return res.status(500).json({ message: beneficiaryResult.message });
    }

    // if (beneficiaryResult && beneficiaryResult.beneficiaryID) {
    //     const balanceUpdateResult = await addBalanceToBeneficiary(beneficiaryResult.beneficiaryID);

    //     if (!balanceUpdateResult.success) {
    //         console.error("Error adding balance:", balanceUpdateResult.message);
    //         await client.query('ROLLBACK');
    //         return res.status(500).json({ message: balanceUpdateResult.message });
    //     }
    // }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Customer added successfully',
      newCustomerId: customerResult.customerID,
      beneficiaryID: beneficiaryResult.beneficiaryID,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Unexpected error adding customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNewCustomerRecord = async (accountId, introducerId) => {
  try {
    await client.query('BEGIN');

    const checkCustomerQuery = `
      SELECT 1 FROM customer_introducer_beneficiary WHERE customerID = $1;
    `;
    const customerExists = await client.query(checkCustomerQuery, [accountId]);

    if (customerExists.rowCount > 0) {
      await client.query('ROLLBACK');
      return { status: 400, error: true, message: 'Account ID already exists' };
    }

    const insertCustomerQuery = `
      INSERT INTO customer_introducer_beneficiary (customerID, introducerID)
      VALUES ($1, $2)
      RETURNING customerID;
    `;
    const result = await client.query(insertCustomerQuery, [
      accountId,
      introducerId,
    ]);

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return { status: 500, error: true, message: 'Failed to add customer' };
    }

    await client.query('COMMIT');

    return { customerID: result.rows[0].customerid };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database error in createNewCustomerRecord:', error);
    return {
      status: 500,
      error: true,
      message: 'Database error adding customer',
    };
  }
};

const updateBeneficiaryAndCount = async (introducerId, accountID) => {
  try {
    await client.query('BEGIN');

    const introducerCount = await getIntroducerCount(introducerId);

    const beneficiaryID = await determineBeneficiary(
      introducerCount,
      introducerId
    );

    if (beneficiaryID) {
      await updateBeneficiaryInDatabase(accountID, beneficiaryID);
    }

    await client.query('COMMIT');
    return { success: true, introducerCount, beneficiaryID };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating beneficiary and count:', error);
    return { error: true, message: 'Error updating beneficiary and count' };
  }
};

const getIntroducerCount = async (introducerId) => {
  const countIntroducersQuery = `
      SELECT COUNT(*) AS introducerCount
      FROM customer_introducer_beneficiary
      WHERE introducerID = $1;
    `;
  const countResult = await client.query(countIntroducersQuery, [introducerId]);
  return parseInt(countResult.rows[0].introducercount || 0);
};

const determineBeneficiary = async (introducerCount, introducerId) => {
  if (introducerCount % 2 === 1) {
    return introducerId;
  } else {
    return await findIntroducerBeneficiary(introducerId);
  }
};

const findIntroducerBeneficiary = async (introducerId) => {
  const findIntroducerIntroducerQuery = `
      SELECT introducerID
      FROM customer_introducer_beneficiary
      WHERE customerID = $1;
  `;

  const introducerIntroducerResult = await client.query(
    findIntroducerIntroducerQuery,
    [introducerId]
  );

  if (introducerIntroducerResult.rows.length === 0) {
    return null;
  }

  const introducerIntroducerId =
    introducerIntroducerResult.rows[0].introducerid;

  const findBeneficiaryQuery = `
      SELECT beneficiaryID
      FROM customer_introducer_beneficiary
      WHERE customerID = $1;
  `;

  const beneficiaryResult = await client.query(findBeneficiaryQuery, [
    introducerIntroducerId,
  ]);

  if (beneficiaryResult.rows.length === 0) {
    return null;
  }

  return beneficiaryResult.rows[0].beneficiaryid;
};

const updateBeneficiaryInDatabase = async (accountID, beneficiaryID) => {
  const updateBeneficiaryQuery = `
        UPDATE customer_introducer_beneficiary
        SET beneficiaryID = $1
        WHERE customerID = $2;
      `;
  await client.query(updateBeneficiaryQuery, [beneficiaryID, accountID]);
};

const addBalanceToBeneficiary = async (beneficiaryID, amount = 100) => {
  if (!beneficiaryID) {
    return { success: false, message: 'No beneficiary ID provided.' }; 
  }

  try {
    await client.query('BEGIN');

    const updateBalanceQuery = `
          UPDATE customer_introducer_beneficiary
          SET balance = balance + $1
          WHERE customerID = $2;  -- Assuming beneficiaryID is a customerID
      `;

    const result = await client.query(updateBalanceQuery, [
      amount,
      beneficiaryID,
    ]);

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return { success: false, message: 'Beneficiary not found.' };
    }

    await client.query('COMMIT');
    return { success: true, message: 'Balance updated successfully.' };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating balance:', error);
    return { success: false, message: 'Error updating balance.' };
  }
};

module.exports = {
  addNewCustomer,
};
