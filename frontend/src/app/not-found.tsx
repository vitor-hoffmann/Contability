"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <h1>pagina nao encontrada - erro 404</h1>
      <button onClick={() => router.push("/dashboard")}>
        Retornar para o dashboard
      </button>
    </div>
  );
}
