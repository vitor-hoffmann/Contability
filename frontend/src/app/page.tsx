"use client";

import { getCookie } from "@/pages/auth/getCookie";
import { isTokenValid } from "@/pages/auth/isTokenValid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = getCookie("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const valid = await isTokenValid(token);
      if (!valid) {
        router.push("/login");
      }
    };
    checkToken();
    const intervalId = setInterval(() => {
      checkToken();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [router]);

  return (
    <div>
      <h1>home</h1>
    </div>
  );
}
