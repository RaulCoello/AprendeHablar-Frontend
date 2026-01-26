import { useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import TypeQuestions from "./TypeQuestions";

export default function ListQuestions({ questions, gameid }) {
  const [openTypesQuestions, setOpenTypesQuestions] = useState(false);

  return (
    <div>
      {/* ABRIR EL TIPO DE PREGUNTAS PARA CREAR */}
      {openTypesQuestions && (
        <TypeQuestions
          gameid={gameid}
          CloseTypesQuestion={() => setOpenTypesQuestions(false)}
        />
      )}
      {/* LISTA DE PREGUNTAS DEL JUEGO */}
      <div className="p-4 grid lg:grid-cols-1 grid-cols-1 gap-10">
        {questions.map((question, index) => {
          return (
            <div
              key={index}
              className="flex flex-col p-4 gap-2  text-3xl  hover:shadow-xl hover:shadow-lime-900 cursor-pointer items-center justify-center border-8 border-lime-500 rounded-3xl"
            >
              <div></div>
              <div className="flex flex-row gap-2 w-full items-center justify-center">
                <h1 className="flex-1 p-2 text-start font-bold text-lime-950">
                  {question.title ? question.title : "Sin Titulo"}
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
        {/* AQUI AGREGAR UNO QUE SEA CEAR UNA NUEVA PREGUNTA */}

        <div
          key={0}
          onClick={() => setOpenTypesQuestions(true)}
          className="flex flex-col p-4 gap-2  text-3xl  cursor-pointer items-center justify-center border-8 border-lime-500/30 border-dashed rounded-3xl bg-slate-50 hover:bg-slate-200 hover:border-lime-500/60"
        >
          Nuevo +
        </div>
      </div>
    </div>
  );
}
