// Import the functions
const {
    calculateRevenue,
    calculateExpenses,
    calculateGrossProfitMargin,
    calculateNetProfitMargin,
    calculateAssets,
    calculateLiabilities,
    calculateWorkingCapitalRatio
} = require('../index');

// Mock data for testing
const mockLedgerData = {
    data: [
        { account_category: 'revenue', total_value: 10000 },
        { account_category: 'revenue', total_value: 20000 },
        { account_category: 'expense', total_value: 5000 },
        { account_category: 'expense', total_value: 3000 },
        { account_category: 'assets', value_type: 'debit', account_type: 'current', total_value: 15000 },
        { account_category: 'assets', value_type: 'credit', account_type: 'current', total_value: 5000 },
        { account_category: 'liability', value_type: 'credit', account_type: 'current', total_value: 10000 },
        { account_category: 'liability', value_type: 'debit', account_type: 'current', total_value: 2000 },
        { account_category: 'sales', value_type: 'debit', account_type: 'sales', total_value: 25000 },
    ],
};

describe('Ledger Calculation Functions', () => {
    test('calculateRevenue returns total revenue', () => {
        const revenue = calculateRevenue(mockLedgerData);
        expect(revenue).toBe(30000); // 10000 + 20000
    });

    test('calculateExpenses returns total expenses', () => {
        const expenses = calculateExpenses(mockLedgerData);
        expect(expenses).toBe(8000); // 5000 + 3000
    });

    test('calculateGrossProfitMargin returns the correct percentage', () => {
        const revenue = calculateRevenue(mockLedgerData);
        const grossProfitMargin = calculateGrossProfitMargin(mockLedgerData, revenue);
        expect(grossProfitMargin).toBeCloseTo(83.33, 1); // (25000 / 30000) * 100
    });

    test('calculateNetProfitMargin returns the correct percentage', () => {
        const revenue = calculateRevenue(mockLedgerData);
        const expenses = calculateExpenses(mockLedgerData);
        const netProfitMargin = calculateNetProfitMargin(revenue, expenses);
        expect(netProfitMargin).toBeCloseTo(73.33, 1); // ((30000 - 8000) / 30000) * 100
    });

    test('calculateAssets returns the correct asset value', () => {
        const assets = calculateAssets(mockLedgerData);
        expect(assets).toBe(10000); // 15000 - 5000
    });

    test('calculateLiabilities returns the correct liability value', () => {
        const liabilities = calculateLiabilities(mockLedgerData);
        expect(liabilities).toBe(8000); // 10000 - 2000
    });

    test('calculateWorkingCapitalRatio returns the correct ratio', () => {
        const assets = calculateAssets(mockLedgerData);
        const liabilities = calculateLiabilities(mockLedgerData);
        const workingCapitalRatio = calculateWorkingCapitalRatio(assets, liabilities);
        expect(workingCapitalRatio).toBeCloseTo(125, 1); // (10000 / 8000) * 100
    });
});
