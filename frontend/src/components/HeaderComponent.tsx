// components/Header.tsx
import React, { useEffect, useState } from "react";
import Title from "./TitleComponent";
import SimpleText from "./SimpleTextComponent";
import { getUser } from "@/user/getUser";
import { getCookie } from "@/auth/getCookie";

const Header: React.FC = () => {
  const [loggeduser, setLoggeduser] = useState<string | null>(null);
  const [loggeduserimage, setLoggeduserimage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const id = getCookie("X-AUTH-B");
    async function getLoggedUser() {
      try {
        const response = await getUser(id);
        setLoggeduser(response.name);
        setLoggeduserimage(response.avatar);
      } catch (error) {
        setLoggeduser("");
      }
    }
    getLoggedUser();
  }, []);
  return (
    <header className="bg-blue-600 p-8">
      <nav>
        <ul className="flex justify-around items-center text-white">
          <li>
            <a href="/dashboard">logo</a>
          </li>
          <li className="cursor-default">
            <Title styles="text-white " text="DASHBOARD" />
          </li>
          <li className="cursor-default flex gap-3">
            <SimpleText styles="text-white" message={`Olá, ${loggeduser}`} />
            <img
              alt="user-avatar"
              src={loggeduserimage}
              className="cursor-pointer"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
