import React, { useState } from "react";

import axios from "axios"; 
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //kirim permintaan POST ke endpoitn login
            const response = await axios.post(
                "/api/auth/login", // Cukup seperti ini
                { email, password }
            );

            //simpen token yang diterima ke local storage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login berhasil!");
            navigate("/home"); //arahin ke halaman utama/dashboard setelah login
        } catch (error) {
            const errorMessage = error.response?.data?.msg || "Terjadi kesalahan. Silakan coba lagi.";
            console.error("Login gagal:", errorMessage);
            setError(errorMessage);
        }
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
  
  // Style untuk form agar lebih terstruktur
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px", // Jarak antar elemen di dalam form
    width: "300px",
  };

  // Style untuk grup input (label + input field)
  const inputGroupStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  };

  // Style untuk label
  const labelStyle = {
    marginBottom: "5px",
    fontSize: "0.9em",
  };
  
  // Style untuk input field
  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#3a3f47",
    color: "white",
    fontSize: "1em",
  };

  // Style untuk tombol, diambil dari HomePage
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
  
  // Style untuk link ke halaman registrasi
  const linkStyle = {
      marginTop: '20px',
      color: '#61dafb',
      textDecoration: 'none'
  };

  const errorStyle = {
    color: '#ff4d4d',
    marginTop: '0px',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '0.9em',
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email" // Tipe yang lebih tepat adalah "email"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setError("");}}
            required
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setError("");}}
            required
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      
      {/* 2. Tambahkan link ke halaman Register */}
      <Link to="/register" style={linkStyle}>
        Belum punya akun? Register di sini
      </Link>
    </div>
  );
}

export default LoginPage;