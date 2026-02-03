import { useEffect } from "react";

import dynamic from "next/dynamic";
import SuccessAnimation from "../../../public/Anim/SuccessAnimation.json";
import FailureAnimation from "../../../public/Anim/FailureAnimation.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function CorrectOp({ is_correct, close }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 5000); // 10000 --> 10 segundos

    // cleanup para evitar memory leaks si el modal se cierra antes
    return () => clearTimeout(timer);
  }, [close]);

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="w-[30vh] ">
        <div
          className={`rounded-xl animate-fade-in ${is_correct ? "bg-green-200" : "bg-red-200"}`}
        >
          <div className=" h-full w-full content-center">
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
