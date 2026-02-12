import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function Retroceder({ ruta }) {
  const router = useRouter();

  return (
    <div className="p-4 bg-amber-100 rounded-2xl">
      <button
        className="rounded-2xl bg-amber-400 p-2 cursor-pointer"
        onClick={() => router.push(ruta)}
      >
        <AiOutlineArrowLeft className="text-3xl" />
      </button>
    </div>
  );
}
