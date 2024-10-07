import React, { useEffect, useState } from "react";
import Title from "./TitleComponent";
import SimpleText from "./SimpleTextComponent";
import { getUser } from "@/user/getUser";
import { getCookie } from "@/auth/getCookie";
import ProfileModal from "./ProfileModal";

const Header: React.FC = () => {
  const [loggeduser, setLoggeduser] = useState<string | null>(null);
  const [loggeduseremail, setLoggeduseremail] = useState<string | null>(null);
  const [loggeduserimage, setLoggeduserimage] = useState<string | undefined>(
    undefined
  );
  const [profilemodal, setProfilemodal] = useState<boolean>(false);
  const [imageError, setImageError] = useState(false);

  const defaultSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      className="h-7 cursor-pointer w-auto"
    >
      <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
    </svg>
  );

  useEffect(() => {
    const id = getCookie("X-AUTH-B");
    async function getLoggedUser() {
      try {
        const response = await getUser(id);
        setLoggeduser(response.name);
        setLoggeduserimage(response.avatar);
        setLoggeduseremail(response.email);
      } catch (error) {
        setLoggeduser("");
      }
    }
    getLoggedUser();
  }, []);

  function handleProfileClick() {
    setProfilemodal(!profilemodal);
  }

  return (
    <div>
      <header className="bg-blue-600 p-8">
        <nav>
          <ul className="flex justify-around items-center text-white">
            <li>
              <a href="/dashboard">logo</a>
            </li>
            <li className="cursor-default">
              <Title styles="text-white " text="DASHBOARD" />
            </li>
            <li className="cursor-default flex items-center gap-6 relative">
              <SimpleText
                styles="text-white"
                message={`Hello, ${loggeduser}`}
              />
              <div className="relative">
                <div onClick={handleProfileClick} className="cursor-pointer">
                  {loggeduserimage && !imageError ? (
                    <img
                      alt="user-avatar"
                      src={loggeduserimage}
                      onError={() => setImageError(true)}
                      className="w-auto h-14 rounded-full"
                    />
                  ) : (
                    defaultSVG
                  )}
                </div>
                {profilemodal && (
                  <div className="absolute top-full right-1/2 transform mt-2">
                    <ProfileModal
                      user={{ name: loggeduser, email: loggeduseremail }}
                      onClose={handleProfileClick}
                    />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
