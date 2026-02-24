"use client";
import { useState, useRef, useEffect } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";

export default function QSEBody({ onReturnBody, id, setLoading }) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [question, setQuestion] = useState({
    title: "",
    indication: "",
    resource: null,
  });

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

  const fetchData = async () => {
    try {
      setLoading(true);
      // cargar los datos de la pregunta
      const response = await fetch(`${apiUrl}/questions/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setQuestion(data);
    } catch (err) {
      alert("Error al cargar los datos");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // funcion para retornar el body al padre

  useEffect(() => {
    onReturnBody({
      title: question.title,
      indication: question.indication,
      resource: fileE,
    });
  }, [question, fileE]);

  return (
    <div className="flex flex-col gap-3 shadow-2xl mt-4 mb-4 rounded-2xl items-center content-center text-center justify-center">
      <div className="p-4 mx-auto flex flex-col gap-4 w-full">
        <input
          value={question.title}
          onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          placeholder="Titulo de pregunta"
          className="text-center text-3xl font-bold text-black w-full"
        />
        {/* Si no ha subido una imagen entonces mostrar una por default || data.resource*/}

        {question.resource && !fileP ? (
          <img
            src={`${apiBase}/${question.resource}`}
            alt="Imagen"
            className="mt-3 h-64 w-64  mx-auto"
          />
        ) : !fileP ? (
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
            accept="image/png, .jpeg, .gif, .jpg"
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
          value={question.indication || ""}
          onChange={(e) =>
            setQuestion({ ...question, indication: e.target.value })
          }
          placeholder="Indicación de pregunta"
          className="text-center text-2xl text-slate-700 w-full"
        />
      </div>
    </div>
  );
}
