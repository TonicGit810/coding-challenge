// Load JSON data
const ledgerData = require('./data.json');

// Helper function to format numbers with commas
function formatWithCommas(number) {
    return number.toLocaleString();
}

//Calculate total value for revenue accounts
function calculateRevenue(ledgerData) {
    const totalRevenue = ledgerData.data
      .filter(account => account.account_category === 'revenue')
      .reduce((sum, account) => sum + account.total_value, 0);
    
    const finalRevenue = Math.floor(totalRevenue); // Remove cents from the final total value
  
    return formatWithCommas(finalRevenue); // Format with commas
}

// Calculate total value for 'expense' accounts and truncate the final result
function calculateExpenses(ledgerData) {
    const totalExpenses = ledgerData.data
      .filter(account => account.account_category === 'expense')
      .reduce((sum, account) => sum + account.total_value, 0);
    
    const finalExpenses = Math.floor(totalExpenses); // Remove cents from the final total value
  
    return formatWithCommas(finalExpenses); // Format with commas
  }

  
const expenses = calculateExpenses(ledgerData);
const revenue = calculateRevenue(ledgerData);
console.log(`Revenue: $${revenue}`);
console.log(`Expenses: $${expenses}`);