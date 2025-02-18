// const client = require('../db');

// // const addNewCustomer = async (req, res) => {
// //   const { accountId, introducerId } = req.body;

// //   try {
// //     await client.query('BEGIN');

// //     // // Check if the customer already exists
// //     // const customerExistsQuery = 'SELECT 1 FROM customers WHERE accountID = $1';
// //     // const customerExistsResult = await client.query(customerExistsQuery, [accountId]);

// //     // if (customerExistsResult.rows.length > 0) {
// //     //   await client.query('ROLLBACK');
// //     //   return res.status(400).json({ message: 'Customer already exists.' });
// //     // }

// //     // let validIntroducerId = introducerId || null;

// //     // // If introducerId is provided, check if it exists
// //     // if (introducerId) {
// //     //   const introducerExistsQuery = 'SELECT 1 FROM customers WHERE accountID = $1';
// //     //   const introducerExistsResult = await client.query(introducerExistsQuery, [introducerId]);

// //     //   if (introducerExistsResult.rows.length === 0) {
// //     //     validIntroducerId = null;
// //     //   }
// //     // }

// //     // Insert the new customer
// //     const insertCustomerQuery = `
// //       INSERT INTO customers (accountID, introducerID)
// //       VALUES ($1, $2)
// //       RETURNING accountID
// //     `;
// //     const insertCustomerResult = await client.query(insertCustomerQuery, [accountId, validIntroducerId]);

// //     const newAccountId = insertCustomerResult.rows[0].accountid;

// //     // If there's an introducer, update their customerCount and balance
// //     if (validIntroducerId) {
// //       const updateIntroducerQuery = `
// //         UPDATE customers
// //         SET customerCount = customerCount + 1,
// //             balance = balance + 100 -- Assuming a referral bonus of 100 units
// //         WHERE accountID = $1
// //       `;
// //       await client.query(updateIntroducerQuery, [validIntroducerId]);
// //     }

// //     // Add entry to beneficiaries table
// //     const insertBeneficiaryQuery = `
// //       INSERT INTO beneficiaries (accountID, beneficiaryAccountID)
// //       VALUES ($1, $2)
// //       RETURNING beneficiaryID
// //     `;
// //     const insertBeneficiaryResult = await client.query(insertBeneficiaryQuery, [validIntroducerId || newAccountId, newAccountId]);

// //     await client.query('COMMIT');

// //     res.status(201).json({ beneficiaryId: insertBeneficiaryResult.rows[0].beneficiaryid });
// //   } catch (error) {
// //     await client.query('ROLLBACK');
// //     console.error('Error adding new customer:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // };

// // module.exports = { addNewCustomer };


// // const addNewCustomer = async (req, res) => {
// //     const { accountId, introducerId } = req.body;
  
// //     try {
// //       await client.query('BEGIN');
  
// //       const insertCustomerQuery = `
// //         INSERT INTO customers (accountID, introducerID)
// //         VALUES ($1, $2)
// //         RETURNING accountID
// //       `;
// //       const insertCustomerResult = await client.query(insertCustomerQuery, [accountId, introducerId]);
      
// //       const newAccountId = insertCustomerResult.rows[0].accountid;

  
// //       const updateIntroducerQuery = `
// //       UPDATE user_counts
// //       SET customerCount = customerCount + 1
// //       WHERE introducerID = $1
// //     `;
// //     await client.query(updateIntroducerQuery, [introducerId]);

// //     let beneficiaryAccountID;

// //     const introducerCountQuery = 'SELECT customerCount FROM user_counts WHERE introducerID = $1';
// //     const introducerCountResult = await client.query(introducerCountQuery, [introducerId]);

// //     const introducerCount = introducerCountResult.rows[0].customerCount;

  
// //       if (introducerCount % 2 === 1) {
// //         beneficiaryAccountID = introducerId;
// //       } else if(introducerCount > 0 ) {
// //         const introducerIntroducerQuery = 'SELECT introducerID FROM customers WHERE accountID = $1';
// //         const introducerIntroducerResult = await client.query(introducerIntroducerQuery, [introducerId]);
  
// //         const introducerIntroducerId = introducerIntroducerResult.rows[0].introducerID;

// //         console.log({introducerIntroducerResult})
  
// //         const introducerIntroducerBeneficiaryQuery = `
// //           SELECT beneficiaryAccountID 
// //           FROM beneficiaries 
// //           WHERE accountID = $1
// //         `;
// //         const introducerIntroducerBeneficiaryResult = await client.query(introducerIntroducerBeneficiaryQuery, [introducerIntroducerId]);
        
// //         console.log(JSON.stringify(introducerIntroducerBeneficiaryResult.rows))
  
// //         beneficiaryAccountID = introducerIntroducerBeneficiaryResult.rows[0].beneficiaryAccountID;
// //       }


// //       console.log({beneficiaryAccountID})
  
// //       const insertBeneficiaryQuery = `
// //         INSERT INTO beneficiaries (accountID, beneficiaryAccountID)
// //         VALUES ($1, $2)
// //         RETURNING beneficiaryAccountID
// //       `;
// //       const insertBeneficiaryResult = await client.query(insertBeneficiaryQuery, [newAccountId, beneficiaryAccountID]);

// //       const depositAmount = 100;
// //       const updateBeneficiaryBalanceQuery = `
// //         UPDATE customers
// //         SET balance = balance + $1
// //         WHERE accountID = $2
// //         RETURNING balance
// //       `;
// //       const updateBeneficiaryBalanceResult = await client.query(updateBeneficiaryBalanceQuery, [depositAmount, beneficiaryAccountID]);
// //       const updatedBalance = updateBeneficiaryBalanceResult.rows[0].balance;

  
// //       await client.query('COMMIT');
  
// //       res.status(201).json({
// //         beneficiaryAccountID: insertBeneficiaryResult.rows[0].beneficiaryAccountID,
// //         updatedBalance: updatedBalance
// //       });
    
// //     } catch (error) {
// //       await client.query('ROLLBACK');
// //       console.error('Error adding new customer:', error);
// //       res.status(500).json({ message: 'Internal server error' });
// //     }
// //   };


// // const addNewCustomer = async (req, res) => {
// //   const { accountId, introducerId } = req.body;

// //   try {
// //     await client.query('BEGIN');

// //     // Insert new customer
// //     const insertCustomerQuery = `
// //       INSERT INTO customers (accountID, introducerID)
// //       VALUES ($1, $2)
// //       RETURNING accountID
// //     `;
// //     const insertCustomerResult = await client.query(insertCustomerQuery, [accountId, introducerId]);
// //     const newAccountId = insertCustomerResult.rows[0].accountid;

// //     // Update customer count for introducer
// //     const updateIntroducerQuery = `
// //       UPDATE user_counts
// //       SET customerCount = customerCount + 1
// //       WHERE introducerID = $1
// //     `;
// //     let updateResult = await client.query(updateIntroducerQuery, [introducerId]);

// //     if (updateResult.rowCount === 0) {
// //       // If no rows were updated, the introducer doesn't exist, so create them
// //       const createIntroducerQuery = `
// //         INSERT INTO user_counts (introducerID, customerCount)
// //         VALUES ($1, 1)
// //       `;
// //       await client.query(createIntroducerQuery, [introducerId]);
// //     }

// //     let beneficiaryAccountID;

// //     // Check the introducer's customer count (odd/even) to determine the beneficiary
// //     const introducerCountQuery = 'SELECT customerCount FROM user_counts WHERE introducerID = $1';
// //     const introducerCountResult = await client.query(introducerCountQuery, [introducerId]);
// //     const introducerCount = introducerCountResult.rows[0].customerCount;


// //     console.log({introducerCount})

// //     if (introducerCount % 2 === 1) {
// //       // Odd: Beneficiary is the introducer
// //       beneficiaryAccountID = introducerId;
// //     } else {
// //       // Even: Beneficiary is the introducer's introducer
// //       const introducerIntroducerQuery = 'SELECT introducerID FROM customers WHERE accountID = $1';
// //       const introducerIntroducerResult = await client.query(introducerIntroducerQuery, [introducerId]);
// //       const introducerIntroducerId = introducerIntroducerResult.rows[0].introducerID;

// //       const introducerIntroducerBeneficiaryQuery = `
// //         SELECT beneficiaryAccountID
// //         FROM beneficiaries
// //         WHERE accountID = $1
// //       `;
// //       const introducerIntroducerBeneficiaryResult = await client.query(introducerIntroducerBeneficiaryQuery, [introducerIntroducerId]);
// //       console.log({introducerIntroducerBeneficiaryResult})
// //       beneficiaryAccountID = introducerIntroducerBeneficiaryResult.rows[0].beneficiaryaccountid;
// //     }

// //     // Insert the beneficiary record
// //     const insertBeneficiaryQuery = `
// //       INSERT INTO beneficiaries (accountID, beneficiaryAccountID)
// //       VALUES ($1, $2)
// //       RETURNING beneficiaryAccountID
// //     `;
// //     const insertBeneficiaryResult = await client.query(insertBeneficiaryQuery, [newAccountId, beneficiaryAccountID]);

// //     // Credit ₹100 to the beneficiary's account
// //     const depositAmount = 100;
// //     const updateBeneficiaryBalanceQuery = `
// //       UPDATE customers
// //       SET balance = balance + $1
// //       WHERE accountID = $2
// //       RETURNING balance
// //     `;
// //     const updateBeneficiaryBalanceResult = await client.query(updateBeneficiaryBalanceQuery, [depositAmount, beneficiaryAccountID]);
// //     const updatedBalance = updateBeneficiaryBalanceResult.rows[0].balance;

// //     await client.query('COMMIT');

// //     res.status(201).json({
// //       beneficiaryAccountID: insertBeneficiaryResult.rows[0].beneficiaryAccountID,
// //       updatedBalance: updatedBalance
// //     });

// //   } catch (error) {
// //     await client.query('ROLLBACK');
// //     console.error('Error adding new customer:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // };



// const addNewCustomer = async (req, res) => {
//   const { customerId, introducerId } = req.body; 

//   if (!customerId || !introducerId) {
//     return res.status(400).json({ message: 'customerId and introducerId are required' });
//   }

//   if (customerId === introducerId) {
//     return res.status(400).json({ message: 'customerId and introducerId cannot be same' });
//   }

//   try {
//     await client.query('BEGIN');

//     // Check if customerId already exists
//     const checkCustomerQuery = `
//       SELECT 1 FROM customer_introducer_beneficiary WHERE customerID = $1;
//     `;
//     const customerExists = await client.query(checkCustomerQuery, [customerId]);

//     if (customerExists.rowCount > 0) {
//       await client.query('ROLLBACK');
//       return res.status(400).json({ message: 'Customer ID already exists' });
//     }

//     // Part 1: Insert into the combined table
//     const insertCustomerQuery = `
//       INSERT INTO customer_introducer_beneficiary (customerID, introducerID)
//       VALUES ($1, $2)
//       RETURNING customerID;
//     `;
//     const result = await client.query(insertCustomerQuery, [customerId, introducerId]);


//     if (result.rowCount === 0) {
//       await client.query('ROLLBACK');
//       return res.status(500).json({ message: 'Failed to add customer' });
//     }

//     // Part 2: Update introducer's customer count
//     const updateIntroducerCountQuery = `
//       UPDATE customer_introducer_beneficiary
//       SET introducer_customer_count = introducer_customer_count + 1
//       WHERE introducerID = $1;
//     `;
//     await client.query(updateIntroducerCountQuery, [introducerId]);

//     // Part 3: Determine beneficiary and update the combined table
//     let beneficiaryID;
//     const getIntroducerCountQuery = `
//       SELECT introducer_customer_count FROM customer_introducer_beneficiary WHERE introducerID = $1;
//     `;
//     const introducerCountResult = await client.query(getIntroducerCountQuery, [introducerId]);
//     const introducerCount = introducerCountResult.rows[0].introducer_customer_count;

//     if (introducerCount % 2 === 1) {
//       beneficiaryID = introducerId;
//     } else {
//       const introducerIntroducerQuery = `
//         SELECT introducerID FROM customer_introducer_beneficiary WHERE customerID = (SELECT introducerID FROM customer_introducer_beneficiary WHERE customerID = $1);
//       `;
//       const introducerIntroducerResult = await client.query(introducerIntroducerQuery, [introducerId]);

//       if (introducerIntroducerResult.rowCount === 0) {
//         throw new Error('Introducer\'s introducer not found');
//       }

//       const introducerIntroducerId = introducerIntroducerResult.rows[0].introducerID;

//       const introducerIntroducerBeneficiaryQuery = `
//         SELECT beneficiaryID FROM customer_introducer_beneficiary WHERE customerID = (SELECT beneficiaryID FROM customer_introducer_beneficiary WHERE customerID = $1);
//       `;
//       const introducerIntroducerBeneficiaryResult = await client.query(introducerIntroducerBeneficiaryQuery, [introducerIntroducerId]);

//       if (introducerIntroducerBeneficiaryResult.rowCount === 0) {
//         throw new Error('Beneficiary not found for introducer\'s introducer');
//       }

//       beneficiaryID = introducerIntroducerBeneficiaryResult.rows[0].beneficiaryID;
//     }

//     if (beneficiaryID === undefined) {
//       throw new Error("Beneficiary ID could not be determined.");
//     }

//     const updateBeneficiaryQuery = `
//       UPDATE customer_introducer_beneficiary
//       SET beneficiaryID = $1
//       WHERE customerID = $2;
//     `;
//     await client.query(updateBeneficiaryQuery, [beneficiaryID, customerId]);

//     await client.query('COMMIT');

//     res.status(201).json({
//       message: 'Customer added successfully',
//       newCustomerId: customerId, 
//     });
//   } catch (error) {
//     await client.query('ROLLBACK');
//     console.error('Error adding customer:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };





// module.exports = { addNewCustomer };



const client = require('../db');


const createCombinedTable = async () => {
  const createCombinedTableQuery = `
    CREATE TABLE IF NOT EXISTS customer_introducer_beneficiary (
      customerID INT PRIMARY KEY,
      introducerID INT,
      beneficiaryID INT,
      balance DECIMAL(10, 2) DEFAULT 0
    );
  `;

  try {
    await client.query(createCombinedTableQuery);
    console.log("Combined table created or already exists.");
  } catch (error) {
    console.error("Error creating combined table:", error);
    throw error;
  }
};

const addNewCustomer = async (req, res) => {
  const { accountId, introducerId } = req.body;

  if (!accountId || !introducerId) {
    return res.status(400).json({ message: 'accountId and introducerId are required' });
  }

  if (accountId === introducerId) {
    return res.status(400).json({ message: 'accountId and introducerId cannot be the same' });
  }

  try {
    await client.query('BEGIN');

    const customerResult = await createNewCustomerRecord(accountId, introducerId);

    if (customerResult.error) {
        await client.query('ROLLBACK');
        return res.status(customerResult.status || 500).json({ message: customerResult.message });
    }

    const beneficiaryResult = await updateBeneficiaryAndCount(introducerId, accountId);

    if (beneficiaryResult.error) {
        console.error("Error updating beneficiary:", beneficiaryResult.message);
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
        beneficiaryID: beneficiaryResult.beneficiaryID
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
    const result = await client.query(insertCustomerQuery, [accountId, introducerId]);

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return { status: 500, error: true, message: 'Failed to add customer' };
    }

    await client.query('COMMIT');

    return { customerID: result.rows[0].customerid };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Database error in createNewCustomerRecord:", error);
    return { status: 500, error: true, message: 'Database error adding customer' };
  }
};

const updateBeneficiaryAndCount = async (introducerId, accountID) => {
  try {
    await client.query('BEGIN');

    const introducerCount = await getIntroducerCount(introducerId);

    const beneficiaryID = await determineBeneficiary(introducerCount, introducerId);

    if (beneficiaryID) {
      await updateBeneficiaryInDatabase(accountID, beneficiaryID);
    }

    await client.query('COMMIT');
    return { success: true, introducerCount, beneficiaryID };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error updating beneficiary and count:", error);
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
}

const determineBeneficiary = async(introducerCount, introducerId) => {
    if (introducerCount % 2 === 1) {
      return introducerId;
    } else {
      return await findIntroducerBeneficiary(introducerId);
    }
}

const findIntroducerBeneficiary = async (introducerId) => {
  const findIntroducerIntroducerQuery = `
      SELECT introducerID
      FROM customer_introducer_beneficiary
      WHERE customerID = $1;
  `;

  const introducerIntroducerResult = await client.query(findIntroducerIntroducerQuery, [introducerId]);

  if (introducerIntroducerResult.rows.length === 0) {
      return null;
  }

  const introducerIntroducerId = introducerIntroducerResult.rows[0].introducerid;

  const findBeneficiaryQuery = `
      SELECT beneficiaryID
      FROM customer_introducer_beneficiary
      WHERE customerID = $1;
  `;

  const beneficiaryResult = await client.query(findBeneficiaryQuery, [introducerIntroducerId]);

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
}

const addBalanceToBeneficiary = async (beneficiaryID, amount = 100) => {
  if (!beneficiaryID) {
      return { success: false, message: "No beneficiary ID provided." }; // Handle missing beneficiary
  }


  console.log({beneficiaryID})


  try {
      await client.query('BEGIN');

      const updateBalanceQuery = `
          UPDATE customer_introducer_beneficiary
          SET balance = balance + $1
          WHERE customerID = $2;  -- Assuming beneficiaryID is a customerID
      `;

      const result = await client.query(updateBalanceQuery, [amount, beneficiaryID]);

      if (result.rowCount === 0) {
          await client.query('ROLLBACK');
          return { success: false, message: "Beneficiary not found." };
      }

      await client.query('COMMIT');
      return { success: true, message: "Balance updated successfully." };

  } catch (error) {
      await client.query('ROLLBACK');
      console.error("Error updating balance:", error);
      return { success: false, message: "Error updating balance." };
  }
};


module.exports = { 
    addNewCustomer
};