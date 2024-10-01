"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/InputComponent";
import Title from "@/components/TitleComponent";
import Button from "@/components/ButtonComponent";
import Warning from "@/components/WarningComponent";
import SimpleText from "@/components/SimpleTextComponent";
import { recoverAccount } from "@/auth/recoverAccount";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingComponent";

export default function RecoverPassword() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function handleButtonClick() {
    setLoading(true);
    setMessage(null);
    if (!isValidEmail(email)) {
      setMessage("Invalid email!");
      setLoading(false);
      return;
    }

    await recoverAccount(email);
    setLoading(false);
    router.push("/login");
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-8 w-full">
          <Title text="Recover your password!" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            styles="w-full"
          />
          <SimpleText
            message={
              "If your account exists, we will send you an email to recover your password"
            }
          />
          <Warning message={message} />
          {!loading && (
            <Button
              text="Recover account"
              onClick={() => handleButtonClick()}
              styles="w-2/3 text-lg bg-blue-700 hover:bg-blue-600"
            />
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
