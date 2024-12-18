import React, { createContext, useState, useContext, ReactNode } from "react";

import { Expense } from "../types/expense"; // Correct import path






interface ExpenseContextProps {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  editExpense: (id: string, updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextProps | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => setExpenses((prev) => [...prev, expense]);

  const editExpense = (id: string, updatedExpense: Expense) => {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? updatedExpense : expense))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = (): ExpenseContextProps => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
