import React from "react";
import SimpleText from "./SimpleTextComponent";
import { setCookie } from "@/auth/setCookie";
import { useRouter } from "next/navigation";
import Button from "./ButtonComponent";

interface ProfileModalProps {
  onClose: () => void;
  user: {
    name: string | null;
    email: string | null;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user }) => {
  const router = useRouter();

  function handleLogout() {
    setCookie("X-AUTH-A", "", 999);
    setCookie("X-AUTH-B", "", 999);
    router.push("/login");
  }

  return (
    <div className="relative bg-white rounded-lg p-6 w-auto shadow-lg hover:shadow-xl transition-shadow duration-300 mt-2">
      <Button
        styles="!text-black absolute top-4 right-4 px-0 py-0"
        text="X"
        onClick={onClose}
      />
      <div className="text-start mt-2">
        <h2 className="text-2xl text-black font-semibold">{user.name}</h2>
        <SimpleText message={user.email} />
      </div>
      <div className="flex flex-col justify-around gap-3 mt-6">
        <Button
          onClick={() => console.log("View full profile")}
          styles="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
          text="See full profile"
        />
        <SimpleText
          onClick={() => handleLogout()}
          styles="text-gray-400 cursor-pointer"
          message={"Logout"}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
