const client = require('./../index');

const createCombinedTable = async () => {
  const createCombinedTableQuery = `
  CREATE TABLE IF NOT EXISTS customer_introducer_beneficiary (
    customerID INT PRIMARY KEY,  -- customerID from the form
    introducerID INT,
    beneficiaryID INT
  );
`;

  try {
    await client.query(createCombinedTableQuery);
    console.log('Combined table created or already exists.');
  } catch (error) {
    console.error('Error creating combined table:', error);
    throw error;
  }
};
module.exports = createCombinedTable;
