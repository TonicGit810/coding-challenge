# RewardPay Coding Challenge

## Overview

This repository contains the solution to the [RewardPay coding challenge](https://github.com/your-username/rewardpay-coding-challenge).

Follow the steps below to run the project and execute the tests:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/TonicGit810/coding-challenge.git
    ```
    

2. **Navigate to the project folder**:
    ```bash
    cd rewardpay-coding-challenge
    ```

3. **Install Jest manually**:
    ```bash
    npm install --save-dev jest
    ```

4. **Run the program**:
    To run the program, use the following command:
    ```bash
    npm start
    ```
    This will execute the `index.js` file and show the results of the ledger calculations in the console.

6. **Run the tests**:
    To run the test cases, use the following command:
    ```bash
    npm test
    ```
    This will execute all the unit tests located in the `__tests__` folder. Jest will provide feedback on the results of each test.

## Calculations

Here is how each value is calculated:

### 1. **Revenue**

This is calculated by adding up all the values under `total_value` where the `account_category` field is set to `revenue`.

### 2. **Expenses**

This is calculated by adding up all the values under `total_value` where the `account_category` field is set to `expense`.

### 3. **Gross Profit Margin**

This is calculated in two steps:
- First, add up all the `total_value` fields where the `account_type` is set to `sales` and the `value_type` is set to `debit`.
- Then, divide that by the `revenue` value calculated earlier to generate a percentage.

### 4. **Net Profit Margin**

This is calculated by subtracting the `expenses` value from the `revenue` value and dividing the remainder by the `revenue` to calculate a percentage.

### 5. **Working Capital Ratio**

This is calculated by dividing the `assets` by the `liabilities` to create a percentage value. Here's how `assets` and `liabilities` are calculated:

- **Assets**:
  - Add the `total_value` from all records where the `account_category` is set to `assets`, the `value_type` is set to `debit`, and the `account_type` is one of `current`, `bank`, or `current_accounts_receivable`.
  - Subtract the `total_value` from all records where the `account_category` is set to `assets`, the `value_type` is set to `credit`, and the `account_type` is one of `current`, `bank`, or `current_accounts_receivable`.

- **Liabilities**:
  - Add the `total_value` from all records where the `account_category` is set to `liability`, the `value_type` is set to `credit`, and the `account_type` is one of `current` or `current_accounts_payable`.
  - Subtract the `total_value` from all records where the `account_category` is set to `liability`, the `value_type` is set to `debit`, and the `account_type` is one of `current` or `current_accounts_payable`.

## Dependencies

This project relies on the following dependencies:

- `jest`: A JavaScript testing framework used for running unit tests.



---

**Thank you and good luck!**
