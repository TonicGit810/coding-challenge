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

const revenue = calculateRevenue(ledgerData);
console.log(`Revenue: $${revenue}`);