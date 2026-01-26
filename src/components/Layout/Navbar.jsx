import React from "react";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className=" p-4 flex flex-row gap-11 rounded-3xl">
      <div className="bg-lime-500 rounded-4xl border-8 border-lime-800  flex-1 self-start text-start  content-center items-center justify-center h-[20vh]">
        <div className="mx-auto bg-center justify-center content-center">
          <h1 className="mx-auto px-12 font-black  text-6xl text-white">
            Habla y Aprende
          </h1>
        </div>
      </div>
      <div className="px-14">
        <Image
          className=""
          src="/duo.png"
          alt="Next.js logo"
          width={200}
          height={20}
          priority
        />
      </div>
    </div>
  );
}
