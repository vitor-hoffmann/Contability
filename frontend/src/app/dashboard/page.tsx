"use client";

import { getCookie } from "@/auth/getCookie";
import { isTokenValid } from "@/auth/isTokenValid";
import { getUser } from "@/user/getUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [islogged, setIslogged] = useState<boolean>(false);

  const userId = getCookie("X-AUTH-B");

  async function handleClick() {
    const response = await getUser(userId);
    console.log(response);
  }

  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("X-AUTH-A");
      if (!token) {
        router.push("/login");
        return;
      }

      const valid = await isTokenValid(token);
      if (!valid) {
        router.push("/login");
      }
      setIslogged(true);
    };
    checkToken();
  }, [router]);

  return (
    <>
      {islogged && (
        <div>
          <h1>dashboard</h1>
          <button onClick={handleClick}>clica ai</button>
        </div>
      )}
    </>
  );
}
