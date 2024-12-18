import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import "./ExpenseList.css";

import { Expense } from "../types/expense"; // Correct import path

const ExpenseList: React.FC = () => {
  const { expenses, editExpense, deleteExpense } = useExpenseContext();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Define editedExpense with a proper type
  const [editedExpense, setEditedExpense] = useState<Expense>({
    id: "",
    description: "",
    amount: 0,
    date: "",
    type: "expense", // Ensure default type is set
  });

  const handleEditClick = (id: string, expense: Expense) => {
    setIsEditing(id);
    setEditedExpense({
      id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      type: expense.type, // Ensure type is carried over
    });
  };

  const handleSaveEdit = (id: string) => {
    editExpense(id, editedExpense); // Call editExpense with updated editedExpense
    setIsEditing(null);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(expenses.length / itemsPerPage);
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  // Calculate the range of expenses to display based on currentPage and itemsPerPage
  const currentExpenses = expenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      <ul>
        {currentExpenses.map((expense) => (
          <li key={expense.id}>
            {isEditing === expense.id ? (
              <>
                <input
                  type="text"
                  value={editedExpense.description}
                  onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editedExpense.amount.toString()}
                  onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                />
                <input
                  type="date"
                  value={editedExpense.date}
                  onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                />
                <button onClick={() => handleSaveEdit(expense.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{expense.description}</span> - <span>${expense.amount.toFixed(2)}</span> -{" "}
                <span>{expense.date}</span>
                <button onClick={() => handleEditClick(expense.id, expense)}>Edit</button>
              </>
            )}
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(expenses.length / itemsPerPage)}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(expenses.length / itemsPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
