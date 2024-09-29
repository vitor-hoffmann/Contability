"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/dashboard");
    }, 5000);
  }, [router]);

  return <h1>cuzinho preto</h1>;
}
