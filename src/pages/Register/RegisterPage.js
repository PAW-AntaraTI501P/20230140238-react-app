// src/pages/Register/RegisterPage.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //proses pengalihan ke login
  const [isRedirecting, setIsRedirecting] = useState(false);

  // pesan error
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validasi di sisi klien sebelum mengirim ke server
    if (password.length < 6) {
      setError("Password harus memiliki minimal 6 karakter.");
      return; // Hentikan eksekusi jika password terlalu pendek
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError("Format email tidak valid. Harap periksa kembali.");
      return; // Hentikan eksekusi jika format email salah
    }
    // Kosongkan pesan error jika validasi berhasil
    setError("");

    try {
      await axios.post("/api/auth/register", { name, email, password });

      alert("Registrasi berhasil!");
      
      // Ubah state menjadi true untuk menampilkan pesan pengalihan
      setIsRedirecting(false);

      // Atur timer 
      setTimeout(() => {
        // Arahkan ke halaman login setelah timer selesai
        navigate("/login");
      }, 1000);

    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Terjadi kesalahan. Silakan coba lagi.";
      console.error("Registrasi gagal:", errorMessage);
      setError(errorMessage);
    }
  };

  // Jika sedang proses redirect, tampilkan pesan ini saja
  if (isRedirecting) {
    return (
      <div>
        <h2>Registrasi Berhasil</h2>
        <p>Anda akan diarahkan ke halaman login dalam 1.5 detik...</p>
      </div>
    );
  }
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
  
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
  };

  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  };

  const labelStyle = {
    marginBottom: "5px",
    fontSize: "0.9em",
  };
  
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#3a3f47",
    color: "white",
    fontSize: "1em",
  };

  const buttonStyle = {
    padding: "12px 20px",
    fontSize: "1.1em",
    marginTop: "10px",
    backgroundColor: "#61dafb",
    color: "#282c34",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };
  
  const linkStyle = {
      marginTop: '20px',
      color: '#61dafb',
      textDecoration: 'none'
  };

  const errorStyle = {
    color: '#ff4d4d', // Warna merah untuk error
    marginTop: '10px',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  // Terapkan style juga pada halaman redirect agar konsisten
  if (isRedirecting) {
    return (
      <div style={containerStyle}>
        <h2>Registrasi Berhasil</h2>
        <p>Anda akan diarahkan ke halaman login dalam 1.5 detik...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2>Registrasi Akun Baru</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Nama:</label>
          <input
            style={inputStyle}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>
            Register
        </button>
      </form>
      <p>
        <Link to="/login" style={linkStyle}>
            Sudah punya akun? Login di sini
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;