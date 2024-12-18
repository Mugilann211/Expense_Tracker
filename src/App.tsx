import React from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlyChart from "./charts/MonthlyChart";

const App: React.FC = () => {
  return (
    <ExpenseProvider>
      <Header />
      <ExpenseForm />
      <ExpenseList />
      <MonthlyChart />
    </ExpenseProvider>
  );
};

export default App;
