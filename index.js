// Load JSON data
const ledgerData = require('./data.json');

// Helper function to format numbers with commas
function formatWithCommas(number) {
    return number.toLocaleString();
}

// Calculate total value for revenue accounts
function calculateRevenue(ledgerData) {
    const totalRevenue = ledgerData.data
      .filter(account => account.account_category === 'revenue')
      .reduce((sum, account) => sum + account.total_value, 0);
    
    const finalRevenue = Math.floor(totalRevenue); // Remove cents from the final total value
  
    return finalRevenue;
}

// Calculate total value for expense accounts
function calculateExpenses(ledgerData) {
    const totalExpenses = ledgerData.data
      .filter(account => account.account_category === 'expense')
      .reduce((sum, account) => sum + account.total_value, 0);
    
    const finalExpenses = Math.floor(totalExpenses); // Remove cents from the final total value
  
    return finalExpenses; 
  }


// Calculate Gross Profit Margin
function calculateGrossProfitMargin(ledgerData, revenue) {

    const totalDebit = ledgerData.data
        .filter(account => account.account_type === 'sales' && account.value_type === 'debit')
        .reduce((sum, account) => sum + account.total_value, 0);

    return (totalDebit / revenue) * 100; // Return percentage
    
}

// Calculate Net Profit Margin
function calculateNetProfitMargin(revenue, expenses) {
    return ((revenue - expenses) / revenue) * 100 // Return percentage
}

// Calculate total assets
function calculateAssets(ledgerData) {
    const totalAssetDebit = ledgerData.data
        .filter(account => 
            account.account_category === 'assets' &&
            account.value_type === 'debit' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(account.account_type)
        )
        .reduce((sum, account) => sum + account.total_value, 0);

    const totalAssetsCredit = ledgerData.data
        .filter(account => 
            account.account_category === 'assets' &&
            account.value_type === 'credit' &&
            ['current', 'bank', 'current_accounts_receivable'].includes(account.account_type)
        )
        .reduce((sum, account) => sum + account.total_value, 0);

    return totalAssetDebit - totalAssetsCredit; 
}

// Calculate total liabilities
function calculateLiabilities(ledgerData) {
    const totalLiabilitiesCredit = ledgerData.data
        .filter(account => 
            account.account_category === 'liability' &&
            account.value_type === 'credit' &&
            ['current', 'current_accounts_payable'].includes(account.account_type)
        )
        .reduce((sum, account) => sum + account.total_value, 0);

    const totalLiabilitiesDebit = ledgerData.data
        .filter(account => 
            account.account_category === 'liability' &&
            account.value_type === 'debit' &&
            ['current', 'current_accounts_payable'].includes(account.account_type)
        )
        .reduce((sum, account) => sum + account.total_value, 0);

    return totalLiabilitiesCredit - totalLiabilitiesDebit;
}

// Calculate Working Capital Ratio
function calculateWorkingCapitalRatio(assets, liabilities) {
    return (assets / liabilities) * 100; 
}



const revenue = calculateRevenue(ledgerData); 
const expenses = calculateExpenses(ledgerData);
const grossProfitMargin = calculateGrossProfitMargin(ledgerData, revenue);
const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
const assets = calculateAssets(ledgerData);
const liabilities = calculateLiabilities(ledgerData);
const workingCapitalRatio = calculateWorkingCapitalRatio(assets, liabilities);


console.log(`Revenue: $${formatWithCommas(revenue)}`);
console.log(`Expenses: $${formatWithCommas(expenses)}`);
console.log(`Gross Profit Margin: %${grossProfitMargin.toFixed(1)}`);
console.log(`Net Profit Margin: %${netProfitMargin.toFixed(1)}`);
console.log(`Working Capital Ratio: %${workingCapitalRatio.toFixed(1)}`);


module.exports = {
    calculateRevenue,
    calculateExpenses,
    calculateGrossProfitMargin,
    calculateNetProfitMargin,
    calculateAssets,
    calculateLiabilities,
    calculateWorkingCapitalRatio
};