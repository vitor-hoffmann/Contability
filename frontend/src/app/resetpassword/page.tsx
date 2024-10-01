"use client";

import { resetPassword } from "@/auth/resetPassword";
import Button from "@/components/ButtonComponent";
import Input from "@/components/InputComponent";
import LoadingSpinner from "@/components/LoadingComponent";
import Title from "@/components/TitleComponent";
import Warning from "@/components/WarningComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setConfirmpassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken);
  }, []);

  async function handleButtonClick() {
    setLoading(true);
    if (password !== confirmpassword) {
      setMessage("Your password must match!");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      setMessage("Your password must have 8 or more digits!");
      setLoading(false);
      return;
    }
    const response = await resetPassword(token, password);
    if (response.statusCode) {
      setMessage(response.message);
      setLoading(false);
      return;
    }

    router.push("/login");
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <Title text="Recover your account!" />
          <Input
            type="password"
            placeholder="Insert your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            styles="w-96"
          />
          <Input
            type="password"
            placeholder="Insert your new password again"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            styles="w-96"
          />
          <Warning message={message} />
          {!loading && (
            <Button
              text="Change password"
              onClick={handleButtonClick}
              styles="w-2/4 text-lg bg-blue-700 hover:bg-blue-600"
            />
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
}
