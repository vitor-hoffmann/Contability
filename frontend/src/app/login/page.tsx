"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que o conteúdo está no formato JSON
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin(email, password)}>Login</button>
    </div>
  );
}
