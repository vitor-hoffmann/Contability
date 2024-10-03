"use client";

import { handleRegister } from "@/auth/handleRegister";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import LoadingSpinner from "@/components/LoadingComponent";
import Title from "@/components/TitleComponent";
import Warning from "@/components/WarningComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const avatar = "";
  const router = useRouter();

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleButtonClick() {
    setLoading(true);
    setMessage(null);
    if (name.length < 3) {
      setMessage("Couldn't create your account, please verify your name");
      setLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Couldn't create your account, please verify your email");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setMessage(
        "Couldn't create your account, your password must have 8 or more digits"
      );
      setLoading(false);
      return;
    }
    const response = await handleRegister(email, password, name, avatar);
    if (!response.ok) {
      setMessage("Couldn't create your account, please verify your inputs");
      setLoading(false);
    }

    if (response.ok) {
      router.push("/verifyaccount");
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-20 w-full">
          <Title text="Create your account!" />
          <div className="flex flex-col gap-6 w-full justify-center items-center">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              styles="w-full"
            />
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
            <Warning
              message={"Already have a account? login here!"}
              onClick={() => router.push("/login")}
              styles="text-gray-500 cursor-pointer size-fit text-md w-full"
            />
            {!loading && (
              <Button
                text="Register"
                onClick={() => handleButtonClick()}
                styles="w-2/3 text-lg bg-blue-700 hover:bg-blue-600"
              />
            )}
            {loading && <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
