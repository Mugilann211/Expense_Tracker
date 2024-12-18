import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import "./ExpenseForm.css";

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenseContext();
  const [type, setType] = useState<"Income" | "Expense">("Expense"); // Dropdown for type
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">(0);
  const [date, setDate] = useState("");

  const handleAddEntry = () => {
    if (description && amount && date) {
      addExpense({
        id: Math.random().toString(),
        description: type === "Income" ? "Income: " + description : description,
        amount: type === "Income" ? Math.abs(Number(amount)) : -Math.abs(Number(amount)), // Positive for income, negative for expenses
        date,
        type: type === "Income" ? "income" : "expense", // Add the type property
      });
      setDescription("");
      setAmount(0);
      setDate("");
    }
  };

  return (
    <div className="expense-form">
      <h3>Add Entry</h3>
      <select value={type} onChange={(e) => setType(e.target.value as "Income" | "Expense")}>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleAddEntry}>
        Add {type === "Income" ? "Income" : "Expense"}
      </button>
    </div>
  );
};

export default ExpenseForm;
