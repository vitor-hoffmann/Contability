"use client";

import { getCookie } from "@/app/auth/getCookie";
import { isTokenValid } from "@/app/auth/isTokenValid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
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
  }, [router]);

  return (
    <div>
      <h1>dashboard</h1>
    </div>
  );
}
