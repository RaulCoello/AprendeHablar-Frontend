"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "@/components/Layout/Loader";
import { AiTwotonePlayCircle } from "react-icons/ai";

export default function QSRQuestion({ question, aceptar, speak }) {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE + "/media";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  // cargar las respuestas
  const fetchData = async () => {
    try {
      setLoading(true);
      const id = question.id;
      //alert(id);
      // cargar los datos de la pregunta
      const response = await fetch(`${apiUrl}/answers/${id}/question/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setAnswers(data);
    } catch (err) {
      //alert("Error al cargar los datos");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const LeerPreguntaIndicacion = async () => {
    //console.log(question);
    // title indication
    setSpeaking(true);
    await speak(question.title);
    await speak(question.indication);
    setSpeaking(false);
  };

  useEffect(() => {
    fetchData();
    LeerPreguntaIndicacion();
  }, [question]);

  // como es la primera vez que se abre la pregunta hay que hacer que se lea la pregunta y la indicacion

  return (
    <>
      {loading && <Loader />}
      {/* INTERFAZ PARA CREAR EL JUEGO */}
      <div className="flex flex-col gap-3">
        {/* CUERPO DONDE VA LA PREGUNTA */}
        <div className="flex flex-col gap-3 shadow-2xl mt-4 mb-4 rounded-2xl items-center content-center text-center justify-center">
          <div className="p-4 mx-auto flex flex-col gap-4 w-full">
            <h1 className="text-3xl font-bold w-full">{question.title}</h1>

            {/* Si no ha subido una imagen entonces mostrar una por default */}
            {!question.resource ? (
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
                src={`${apiBase}/${question.resource}`}
                alt="Imagen"
                className="mt-3 h-64 w-64  mx-auto"
              />
            )}
            <h1 className="text-center text-2xl text-slate-700 w-full">
              {question.indication}
            </h1>
          </div>
        </div>
        {/* AQUI VAN LAS OPCIONES DE RESPUESTA */}
        {!speaking ? (
          <div className="p-4 grid lg:grid-cols-2 grid-cols-2 gap-10 animate-fade-in">
            {answers.map((answer, index) => {
              return (
                <div
                  key={index}
                  onClick={() => aceptar(answer.answer, answer.is_correct)}
                  className="flex flex-col p-4 gap-2  text-3xl   hover:shadow-xl hover:shadow-orange-900 cursor-pointer items-center justify-center rounded-3xl"
                  style={{ backgroundColor: answer.color || "#fb923c" }}
                >
                  <div className="flex flex-row gap-2 w-full items-center justify-center">
                    <div className="flex flex-col gap-2">
                      <div className=" flex flex-row gap-2 mx-auto text-center items-center justify-center">
                        <h1 className="w-full flex-1 p-2 text-start font-bold text-white">
                          {answer.answer ? answer.answer : "Sin respuesta"}
                        </h1>
                      </div>
                      <button className="z-10 cursor-pointer  bg-orange-300 rounded-full p-2 font-normal text-lg">
                        <AiTwotonePlayCircle className="text-7xl text-white mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
