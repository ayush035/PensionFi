import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";
import Deposit from "./pages/deposit";
import Investments from "./pages/investments";
import Create from "./pages/create";
import About from "./pages/about";

ReactDOM.render(
  <BrowserRouter>

    <TransactionsProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="investments" element={<Investments />} />
        <Route path="about" element={<About />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </TransactionsProvider>

  </BrowserRouter>,
  document.getElementById("root"),
);
