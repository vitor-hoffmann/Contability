"use client";

import { handleLogin } from "@/app/auth/handleLogin";
import { setCookie } from "@/app/auth/setCookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/app/auth/isTokenValid";
import { getCookie } from "@/app/auth/getCookie";
import Input from "@/app/components/InputComponent";
import Title from "@/app/components/TitleComponent";
import Button from "@/app/components/ButtonComponent";
import Warning from "@/app/components/WarningComponent";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleButtonClick(email: string, password: string) {
    setMessage(null);
    const response = await handleLogin(email, password);
    if (response.token) {
      setCookie("token", response.token, 24);
      setMessage(null);
      router.push("/dashboard");
    } else {
      setMessage(response.message + "!");
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("token");
      if (token) {
        const valid = await isTokenValid(token);
        if (valid) {
          router.push("/dashboard");
          return;
        }
      }
    };
    checkToken();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-custom-gradient">
      <div className="flex flex-col bg-white w-full max-w-md h-auto p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <Title text="Welcome back!" />
          <div className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles="w-80"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles="w-80"
            />
          </div>
          <Button
            text="Login"
            onClick={() => handleButtonClick(email, password)}
            styles="w-80 text-lg"
          />
          <Warning message={message} />
        </div>
      </div>
    </div>
  );
}
