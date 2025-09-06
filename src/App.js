// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage"
import HomePage from "./pages/Home/HomePage";
import TodoPage from "./pages/Todo/TodoPage";
import RegisterPage from "./pages/Register/RegisterPage"
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;