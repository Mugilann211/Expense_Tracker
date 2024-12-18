import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";

const Header: React.FC = () => {
  const { expenses } = useExpenseContext();

  const totalIncome = expenses
    .filter((expense) => expense.amount > 0)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.amount < 0)
    .reduce((sum, expense) => sum + expense.amount,0);

  console.log("Expenses:", expenses); // Log expenses to check the data structure
  console.log("Total Income:", totalIncome);
  console.log("Total Expenses:", totalExpense);

  return (
    <header>
      <h1>Expense Tracker</h1>
      <div>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expense: ${Math.abs(totalExpense).toFixed(2)}</p>
        <p>Balance: ${(totalIncome + totalExpense).toFixed(2)}</p>
      </div>
    </header>
  );
};

export default Header;
