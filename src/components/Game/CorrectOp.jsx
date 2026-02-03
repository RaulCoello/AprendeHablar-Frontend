import { useEffect } from "react";
import dynamic from "next/dynamic";

import SuccessAnimation from "../../../public/Anim/SuccessAnimation.json";
import FailureAnimation from "../../../public/Anim/FailureAnimation.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function CorrectOp({ is_correct, close }) {
  useEffect(() => {
    // 🔊 reproducir sonido al montar
    const sound = new Audio(
      is_correct ? "/Sounds/success.m4a" : "/Sounds/fail.m4a",
    );

    sound.volume = 0.5; // opcional
    sound.play().catch(() => {}); // evita error por autoplay policy

    // ⏱ cerrar modal después de 5s
    const timer = setTimeout(() => {
      close();
    }, 5000);

    return () => {
      clearTimeout(timer);
      sound.pause();
      sound.currentTime = 0;
    };
  }, [close, is_correct]);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[30vh]">
        <div
          className={`rounded-xl animate-fade-in ${
            is_correct ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <div className="h-full w-full content-center">
            <Lottie
              animationData={is_correct ? SuccessAnimation : FailureAnimation}
              className="w-[30vh] mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
