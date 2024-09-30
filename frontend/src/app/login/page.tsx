"use client";

import { handleLogin } from "@/auth/handleLogin";
import { setCookie } from "@/auth/setCookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/InputComponent";
import Title from "@/components/TitleComponent";
import Button from "@/components/ButtonComponent";
import Warning from "@/components/WarningComponent";
import { getCookie } from "@/auth/getCookie";
import { isTokenValid } from "@/auth/isTokenValid";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  async function handleButtonClick() {
    setMessage(null);
    const response = await handleLogin(email, password);
    if (!response.statusCode) {
      if (response.isConfirmed === 0) {
        setMessage("Confirm your account!");
        return;
      }
      if (response.token) {
        setCookie("token", response.token, 24);
        router.push("/dashboard");
        return;
      } else {
        setMessage(response.message + "!");
      }
    }
    setMessage(response.message + "!");
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("token");
      if (!token) {
        return;
      }
      const valid = await isTokenValid(token);
      if (valid) {
        router.push("/dashboard");
      }
    };
    checkToken();
  }, [router]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-20 w-full">
          <Title text="Welcome back!" />
          <div className="flex flex-col gap-6 w-full justify-center items-center">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles="w-full"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles="w-full"
            />
            <Warning message={message} />
          </div>
          <div className="flex w-full gap-6 justify-center items-center">
            <div className="w-full flex flex-col gap-2">
              <Warning
                message={"New here? register now!"}
                onClick={() => router.push("/register")}
                styles="text-gray-500 cursor-pointer size-fit text-md w-full"
              />
              <Warning
                message={"Forgot your password? recover here!"}
                onClick={() => router.push("/recoverpassword")}
                styles="text-gray-500 cursor-pointer size-fit text-md w-full"
              />
            </div>
            <Button
              text="Login"
              onClick={() => handleButtonClick()}
              styles="w-2/3 text-lg bg-blue-700 hover:bg-blue-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
