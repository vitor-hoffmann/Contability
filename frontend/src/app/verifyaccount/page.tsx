"use client";

import Button from "@/components/ButtonComponent";
import SimpleText from "@/components/SimpleTextComponent";
import Title from "@/components/TitleComponent";

export default function verifyaccount() {
  return (
    <div className="flex justify-center items-center h-auto min-h-screen bg-custom-gradient">
      <div className="flex flex-col justify-center items-center bg-white w-full max-w-xl h-auto p-10 py-28 mx-10 rounded-2xl shadow-lg">
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          <Title text="Verify your account!" />
          <SimpleText
            message={"We've sent you an e-mail to confirm your account!"}
          />
          <Button
            styles="w-2/5 text-lg bg-blue-700 hover:bg-blue-600"
            text="Go back to login"
            onClick={() => location.replace("/login")}
          />
        </div>
      </div>
    </div>
  );
}
