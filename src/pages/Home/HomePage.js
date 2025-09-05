// src/pages/HomePage.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Inisialisasi untuk navigasi

  // 2. Ambil data user dari localStorage dan ubah kembali menjadi objek
  // Gunakan blok try-catch untuk menghindari error jika 'user' tidak ada atau formatnya salah
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  }

  // 3. Buat fungsi untuk handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#282c34",
    color: "white",
    fontFamily: "sans-serif",
  };

  // Tambahkan dua deklarasi konstanta ini di bawah style yang lain
const welcomeMessageStyle = {
    margin: "10px 0 20px 0",
    fontSize: "1.5em",
    color: "#61dafb",
};

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "1.2em",
    marginTop: "20px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Selamat Datang di Aplikasi Todo List</h1>
      {user && (
        <h2 style={welcomeMessageStyle}>
          Selamat Datang, {user.name}! 
        </h2>
      )}
      <p>Kelola semua tugas Anda dengan mudah dan efisien.</p>
      <Link to="/todos" style={buttonStyle}>
        Lihat Daftar Todo
      </Link>
      <button onClick={handleLogout} style={buttonStyle}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;