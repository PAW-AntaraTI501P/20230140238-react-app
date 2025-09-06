// src/pages/TodoPage.js

import React, { useState, useEffect, useCallback } from "react";
import TodoForm from "../../components/TodoForm.js";
import TodoList from "../../components/TodoList.js";
import SearchInput from "../../components/SearchInput.js";
import authFetch from "../../utils/authFetch.js";
import { Link } from "react-router-dom";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // ... (fetchTodos, handleAddTodo, handleDeleteTodo tetap sama) ...

  const fetchTodos = useCallback((searchQuery) => {
    setLoading(true);
    const url = searchQuery
      ? `/api/todos?search=${encodeURIComponent(searchQuery)}`
      : "/api/todos";

    authFetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setTodos(data.todos);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect untuk debounce pencarian tidak berubah
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchTodos(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm, fetchTodos]);

  const handleAddTodo = (task) => {
    authFetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([
          ...todos,
          { id: data.id, task: data.task, completed: false },
        ]);
      })
      .catch((err) => console.error("Error adding todo:", err));
  };

  const handleDeleteTodo = (id) => {
    authFetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };

  const handleToggleCompleted = (id, completed) => {
    authFetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };
  
  // --- FUNGSI BARU UNTUK UPDATE TUGAS ---
  const handleUpdateTodo = (id, newTask) => {
    authFetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, task: newTask } : todo
          )
        );
      })
      .catch((err) => console.error("Error updating todo:", err));
  };


  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>
    );
  }

  const backButtonStyle = {
    display: 'inline-block', // Agar bisa diberi margin dan padding
    padding: "8px 16px",
    fontSize: "1em",
    marginTop: "20px", // Jarak dari atas halaman
    marginBottom: "20px", // Jarak ke header di bawahnya
    backgroundColor: "#6c757d", // Warna abu-abu agar berbeda
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
    alignSelf: 'flex-start' // Posisikan di awal (kiri)
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <Link to="/home" style={backButtonStyle}>
        Back
      </Link>
      <header style={{ textAlign: "center" }}>
        <h1>Aplikasi Todo List</h1>
        <TodoForm onAddTodo={handleAddTodo} />
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h2>Daftar Tugas Anda</h2>
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDeleteTodo={handleDeleteTodo}
          // --- PASS FUNGSI UPDATE BARU ---
          onUpdateTodo={handleUpdateTodo}
        />
      </header>
    </div>
  );
};

export default TodoPage;