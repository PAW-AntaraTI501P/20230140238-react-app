import React, { useState } from "react";

import axios from "axios"; 
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
            navigate("/"); //arahin ke halaman utama/dashboard setelah login
        } catch (error) {
            console.error("Login gagal:", error.response.data);
            alert("Login gagal. Periksa kembali email dan password anda.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                    type="Email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                required
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;