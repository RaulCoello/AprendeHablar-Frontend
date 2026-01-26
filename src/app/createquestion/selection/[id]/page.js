"use client";
import { useParams } from "next/navigation";
import { useState, useRef, use } from "react";
import Navbar from "@/components/Layout/Navbar";
import Loader from "@/components/Layout/Loader";
import {
  AiFillSave,
  AiOutlineUpload,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Image from "next/image";

export default function SelectionQuestion() {
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [indication, setIndication] = useState("");

  const [answers, setAnswers] = useState([
    { id: 1, text: "Opcion1", correct: false },
    { id: 2, text: "Opcion2", correct: false },
  ]);

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
  return (
    <div className="p-8">
      {loading && <Loader />}
      <Navbar />
      {/* INTERFAZ PARA CREAR EL JUEGO */}
      <div className="flex flex-col gap-3">
        {/* ENCABEZADO */}
        <div className="flex flex-row gap-2 rounded-2xl p-4 bg-yellow-100">
          <h1 className="flex-1 font-bold text-2xl items-center justify-center content-center">
            Crear pregunta
          </h1>
          <button className="z-10 cursor-pointer justify-end  items-end bg-blue-600 rounded-4xl p-3 font-normal text-lg">
            <AiFillSave className="text-3xl text-white" />
          </button>
        </div>
        {/* CUERPO DONDE VA LA PREGUNTA */}
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
              <img
                src={fileP}
                alt="Imagen"
                className="mt-3 h-64 w-64  mx-auto"
              />
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
                <AiOutlineUpload
                  size="25px"
                  color="white"
                  className=" font-bold"
                />
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
        {/* AQUI VAN LAS OPCIONES DE RESPUESTA */}
        <div className="p-4 grid lg:grid-cols-2 grid-cols-2 gap-10">
          {answers.map((answer, index) => {
            return (
              <div
                key={index}
                className="flex flex-col p-4 gap-2  text-3xl  hover:shadow-xl hover:shadow-lime-900 cursor-pointer items-center justify-center border-8 border-lime-500 rounded-3xl"
              >
                <div className="flex flex-row gap-2 w-full items-center justify-center">
                  <h1 className="flex-1 p-2 text-start font-bold text-lime-950">
                    {answer.text ? answer.text : "Sin Titulo"}
                  </h1>
                  <button className="z-10 cursor-pointer justify-end items-end bg-yellow-300 rounded-4xl p-2 font-normal text-lg">
                    <AiTwotoneEdit className="text-3xl" />
                  </button>
                  <button className="z-10 cursor-pointer justify-end items-end bg-red-400 rounded-4xl p-2 font-normal text-lg">
                    <AiFillDelete className="text-3xl text-white" />
                  </button>
                </div>
              </div>
            );
          })}
          {/* AQUI AGREGAR UNO QUE SEA CEAR UNA NUEVA RESPUESTA */}

          <div
            key={0}
            //onClick={() => setOpenTypesQuestions(true)}
            className="flex flex-col p-4 gap-2  text-3xl  cursor-pointer items-center justify-center border-8 border-lime-500/30 border-dashed rounded-3xl bg-slate-50 hover:bg-slate-200 hover:border-lime-500/60"
          >
            Nuevo +
          </div>
        </div>
      </div>
    </div>
  );
}
