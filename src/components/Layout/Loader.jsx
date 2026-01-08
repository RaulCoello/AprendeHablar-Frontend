import dynamic from "next/dynamic";
import anim from "../../../public/Anim/loader.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="w-[20vh] ">
        <div className="bg-white  rounded-xl animate-fade-in">
          <div className=" h-full w-full content-center">
            <Lottie animationData={anim} className="w-[20vh] mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
