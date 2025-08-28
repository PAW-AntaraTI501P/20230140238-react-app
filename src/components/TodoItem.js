// src/components/TodoItem.js

import React, { useState } from "react"; // --- Impor useState ---

// --- Terima prop onUpdateTodo ---
const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo, onUpdateTodo }) => {
  // --- STATE LOKAL UNTUK MODE EDIT ---
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  // --- FUNGSI UNTUK MENYIMPAN PERUBAHAN ---
  const handleSave = () => {
    if (editedTask.trim()) {
      onUpdateTodo(todo.id, editedTask);
      setIsEditing(false); // Keluar dari mode edit setelah menyimpan
    }
  };

  // --- JIKA DALAM MODE EDIT ---
  if (isEditing) {
    return (
      <li
        style={{
          marginBottom: "10px",
          border: "1px solid gold",
          padding: "10px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          style={{
            flexGrow: 1,
            marginRight: "10px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSave}
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            backgroundColor: "lightgreen",
            color: "#282c34",
            border: "none",
            cursor: "pointer",
          }}
        >
          Simpan
        </button>
      </li>
    );
  }

  // --- TAMPILAN NORMAL (JIKA TIDAK DALAM MODE EDIT) ---
  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#2d3d3d" : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            margin: 0,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
          {/* Button Selesai */}
          <button
            onClick={() => onToggleCompleted(todo.id, todo.completed)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: todo.completed ? "salmon" : "lightgreen",
              color: "#282c34",
              border: "none",
              cursor: "pointer",
            }}
          >
            {todo.completed ? "Belum Selesai" : "Selesai"}
          </button>

          {/* Button Edit */}
          <button
            // --- UBAH onClick UNTUK MASUK MODE EDIT ---
            onClick={() => setIsEditing(true)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "gold",
              color: "#282c34",
              border: "none",
              cursor: "pointer",
            }}
          >
            Edit
          </button>

          {/* Button Hapus */}
          <button
            onClick={() => onDeleteTodo(todo.id)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;