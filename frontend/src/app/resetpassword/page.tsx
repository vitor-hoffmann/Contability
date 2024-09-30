"use client";

import Title from "@/components/TitleComponent";
import { useRouter } from "next/navigation";

export default function ActivateAccount() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <Title text="Recover your account!" />
        </div>
      </div>
    </div>
  );
}
