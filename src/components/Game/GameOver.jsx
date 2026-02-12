import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GameOver({ puntos }) {
  const router = useRouter();
  useEffect(() => {
    // 🔊 reproducir sonido al montar
    const sound = new Audio("/Sounds/final_succes.m4a");

    sound.volume = 0.5; // opcional
    sound.play().catch(() => {}); // evita error por autoplay policy

    return () => {
      sound.pause();
      sound.currentTime = 0;
    };
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[60vh]">
        <div className={`rounded-xl animate-fade-in bg-orange-400 p-4`}>
          <div className="h-full w-full content-center text-center flex flex-col gap-2">
            <div className="mx-auto">
              <Image
                className=""
                src="/Trofeo.png"
                alt="Trofeo logo"
                width={200}
                height={20}
                priority
              />
            </div>
            <h1 className="text-4xl text-white font-bold">
              ¡Excelente trabajo!
            </h1>
            <h1 className="text-2xl text-white">
              Completaste todas las preguntas
            </h1>
            <div className="flex flex-row mx-auto gap-2 p-4 content-center justify-center self-center items-center">
              <div className="mx-auto">
                <Image
                  className=""
                  src="/Star.png"
                  alt="Star logo"
                  width={40}
                  height={20}
                  priority
                />
              </div>
              <span className="font-bold text-2xl text-white">
                {`${puntos * 10} Puntos`}
              </span>
            </div>
            <button
              onClick={() => handleRefresh()}
              className=" w-3/6 mx-auto p-2 rounded-2xl text-3xl bg-white text-orange-500 font-bold cursor-pointer"
            >
              Jugar de nuevo
            </button>
            <button
              onClick={() => router.push("/")}
              className=" w-3/6 mx-auto p-2 rounded-2xl text-3xl bg-white text-orange-500 font-bold cursor-pointer"
            >
              Lista de juegos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
