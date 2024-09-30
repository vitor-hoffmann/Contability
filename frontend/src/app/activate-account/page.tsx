"use client";

import SimpleText from "@/components/SimpleTextComponent";
import Title from "@/components/TitleComponent";
import Warning from "@/components/WarningComponent";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { activateAccount } from "@/auth/activateAccount";

export default function ActivateAccount() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(5);
  const hasActivated = useRef(false);

  async function handleActivate() {
    const token = new URLSearchParams(window.location.search).get("token");
    const response = await activateAccount(token);
    if (!response.statusCode) {
      setMessage("Account successfully activated!");
      const intervalId = setInterval(() => {
        if (countdown > 1) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        router.push("/login");
      }, 6000);
    } else {
      setMessage("Activation failed. Please try again.");
    }
  }

  useEffect(() => {
    if (hasActivated.current) return;
    hasActivated.current = true;

    handleActivate();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <Title text="Activate your account!" />
          <SimpleText message={"We're activating your account!"} />
          <Warning message={message} />
          {message === "Account successfully activated!" && (
            <SimpleText message={`Redirecting in ${countdown} seconds...`} />
          )}
        </div>
      </div>
    </div>
  );
}
