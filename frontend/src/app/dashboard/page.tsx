"use client";

import { getCookie } from "@/auth/getCookie";
import { isTokenValid } from "@/auth/isTokenValid";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/auth/authContext";

export default function Dashboard() {
  const { isAuthenticated, logout, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isAuthenticated, logout, login);
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
