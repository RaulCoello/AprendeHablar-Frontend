"use client";
import { useState, useRef, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";

export default function QSCBody({ onReturnBody }) {
  const [title, setTitle] = useState("");
  const [indication, setIndication] = useState("");
  //imagen -------------------
  const fileInputRef = useRef(null);
  //img preview
  const [fileP, setFileP] = useState();
  const [fileE, setFileE] = useState(null);

  const ImagePreview = (e) => {
    try {
      setFileP(URL.createObjectURL(e.target.files[0]));
      const selectedFile = e.target.files[0];
      //setFile(selectedFile);
      setFileE(selectedFile);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  // fin image
  // funcion para retornar el body al padre
  useEffect(() => {
    onReturnBody({
      title,
      indication,
      image: fileE,
    });
  }, [title, indication, fileE]);

  return (
    <div className="flex flex-col gap-3 shadow-2xl mt-4 mb-4 rounded-2xl items-center content-center text-center justify-center">
      <div className="p-4 mx-auto flex flex-col gap-4 w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulo de pregunta"
          className="text-center text-3xl font-bold text-black w-full"
        />
        {/* Si no ha subido una imagen entonces mostrar una por default */}
        {!fileP ? (
          <div className="mx-auto">
            <Image
              src="/duo2.png"
              alt="Next.js logo"
              width={200}
              height={20}
              priority
            />
          </div>
        ) : (
          <img src={fileP} alt="Imagen" className="mt-3 h-64 w-64  mx-auto" />
        )}
        <div className="mx-auto bg-transparent mb-2 w-2/5 text-center items-center">
          <input
            type="file"
            id="fileInput"
            onChange={ImagePreview}
            accept="image/png, .jpeg"
            className="hidden"
            ref={fileInputRef}
          />
          <button
            className=" flex rounded-xl mx-auto gap-2 self-center items-center justify-center  bg-lime-600 text-center w-full p-4 cursor-pointer"
            onClick={handleButtonClick}
          >
            <p className="font-bold text-white ">Subir Foto</p>
            <AiOutlineUpload size="25px" color="white" className=" font-bold" />
          </button>
        </div>
        <input
          value={indication}
          onChange={(e) => setIndication(e.target.value)}
          placeholder="Indicación de pregunta"
          className="text-center text-2xl text-slate-700 w-full"
        />
      </div>
    </div>
  );
}
