"use client";

import Button from "@/components/ButtonComponent";
import SimpleText from "@/components/SimpleTextComponent";
import Title from "@/components/TitleComponent";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="relative">
          {/* Fantasma animado */}
          <div className="w-24 h-24 bg-gray-300 rounded-full relative flex items-center justify-center animate-bounce">
            <div className="absolute w-20 h-20 bg-white rounded-full border-2 border-black"></div>
            {/* Olhos */}
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-black rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-black rounded-full"></div>
            {/* Boca */}
            <div className="absolute bottom-1/4 w-6 h-2 bg-black rounded-full"></div>
          </div>
        </div>

        <Title styles="mt-6 text-2xl" text="Página não encontrada - Erro 404" />

        <SimpleText
          styles="mt-2 "
          message={"Parece que você encontrou um fantasma!"}
        />
        <Button
          onClick={() => router.push("/dashboard")}
          text="Retornar para o dashboard"
          styles="mt-6 bg-blue-600 hover:bg-blue-500 "
        />
      </div>
    </div>
  );
}
