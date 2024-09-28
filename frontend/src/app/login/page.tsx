"use client";

import { handleLogin } from "@/pages/auth/handleLogin";
import { setCookie } from "@/pages/auth/setCookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/pages/auth/isTokenValid";
import { getCookie } from "@/pages/auth/getCookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleButtonClick(email: string, password: string) {
    const token = await handleLogin(email, password);
    if (token) {
      setCookie("token", token, 7);
      setMessage(null);
      router.push("/");
    } else {
      setMessage("erro");
    }
  }
  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("token");
      if (token) {
        const valid = await isTokenValid(token);
        if (valid) {
          router.push("/");
          return;
        }
      }
    };
    checkToken();
    const intervalId = setInterval(() => {
      checkToken();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [router]);

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
      <button onClick={() => handleButtonClick(email, password)}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}
