// src/utils/authFetch.js

const authFetch = (url, options = {}) => {
  // 1. Ambil token dari localStorage
  const token = localStorage.getItem('token');

  // 2. Siapkan header default
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers, // Gabungkan dengan header dari options (jika ada)
  };

  // 3. Jika token ada, tambahkan ke header Authorization
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 4. Gabungkan semuanya dan panggil fetch asli
  const finalOptions = {
    ...options,
    headers: defaultHeaders,
  };

  return fetch(url, finalOptions);
};

export default authFetch;