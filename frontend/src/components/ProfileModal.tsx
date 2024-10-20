import React, { useState } from "react";
import SimpleText from "./SimpleTextComponent";
import { setCookie } from "@/auth/setCookie";
import { useRouter } from "next/navigation";
import Button from "./ButtonComponent";
import Title from "./TitleComponent";
import Input from "./InputComponent";
import LoadingSpinner from "./LoadingComponent";
import { updateUser } from "@/user/updateUser";
import { getCookie } from "@/auth/getCookie";

interface ProfileModalProps {
  onClose: () => void;
  user: {
    name: string | null;
    email: string | null;
    avatar: string | null;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, user }) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string | null>(user.name);
  const [editedAvatar, setEditedAvatar] = useState<string | null>(user.avatar);
  const [message, setMessage] = useState<string | null>(null);

  function handleLogout() {
    setCookie("X-AUTH-A", "", 999);
    setCookie("X-AUTH-B", "", 999);
    router.push("/login");
  }

  function capitalizeName(name: string | null): string {
    if (name) {
      return name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    return "";
  }

  async function handleButtonSubmit() {
    setIsloading(true);
    if (editedName === user.name && editedAvatar === user.avatar) {
      setIsEditing(false);
      setIsloading(false);
      return;
    } else {
      try {
        const id = getCookie("X-AUTH-B");
        const response = await updateUser(
          id,
          capitalizeName(editedName),
          editedAvatar
        );
        if (response.statusCode) {
          setIsloading(false);
          setIsEditing(false);
          setMessage("Error while trying to change profile informations!");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          return;
        }
        setIsloading(false);
        setIsEditing(false);
        setMessage("Successfully changed profile informations!");
        location.reload();
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } catch {
        setIsloading(false);
        setIsEditing(false);
        setMessage("Error while trying to change profile informations!");
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
    setIsloading(false);
  }

  return (
    <div className="relative bg-white rounded-lg p-6 w-auto min-w-80 shadow-lg hover:shadow-x transition-shadow duration-300 mt-2 ">
      <div className="flex justify-between text-center items-center">
        <Title text={"Profile"} />
        <Button styles="!text-black p-0" text="X" onClick={onClose} />
      </div>
      <div className="text-start mt-4">
        {isEditing ? (
          <>
            <Input
              max={70}
              placeholder=""
              type="text"
              value={editedName ?? ""}
              onChange={(e) => setEditedName(e.target.value)}
              styles="border text-black border-gray-300 rounded w-max min-w-72 p-1 mt-2"
            />
            <Input
              max={70}
              type="text"
              placeholder=""
              value={editedAvatar ?? ""}
              onChange={(e) => setEditedAvatar(e.target.value)}
              styles="border text-black border-gray-300 rounded w-max min-w-72 p-1 mt-2"
            />
            <div className="flex gap-2 justify-center items-center">
              {!isloading && (
                <>
                  <Button
                    text={"Save"}
                    onClick={() => handleButtonSubmit()}
                    styles="bg-blue-600 hover:bg-blue-700 mt-3 w-full"
                  />
                  <Button
                    text={"Cancel"}
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(user.name);
                      setEditedAvatar(user.avatar);
                    }}
                    styles="bg-gray-200 hover:bg-gray-300 mt-3 w-full !text-black"
                  />
                </>
              )}
              {isloading && <LoadingSpinner size={10} styles="mt-6" />}
            </div>
          </>
        ) : (
          <>
            <Title
              text={user.name}
              styles="!text-2xl size-fit text-gray-600 font-semibold cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
            <SimpleText
              message={user.email}
              styles="cursor-pointer size-fit text-gray-500 mt-2"
              onClick={() => setIsEditing(true)}
            />
            <SimpleText
              message={"Avatar: " + user.avatar}
              styles="cursor-pointer size-fit text-gray-500 mt-2 max-w-72 overflow-hidden whitespace-nowrap text-ellipsis"
              onClick={() => setIsEditing(true)}
            />
            <div className="flex justify-center">
              <SimpleText
                message={message}
                styles="mt-6 text-red-500 text-center"
              />
            </div>
          </>
        )}
      </div>
      {!isloading && (
        <SimpleText
          onClick={() => handleLogout()}
          styles="text-gray-500 size-fit cursor-pointer mt-6 "
          message={"Logout"}
        />
      )}
    </div>
  );
};

export default ProfileModal;
