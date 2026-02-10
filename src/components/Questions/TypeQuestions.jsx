import React from "react";

export default function TypeQuestions({ gameid, CloseTypesQuestion }) {
  // hay que agregarle iconos a los tipos de preguntas
  const types = [
    {
      id: 1,
      name: "Selección",
      url: `/createquestion/selection/${gameid}`,
    },
    {
      id: 2,
      name: "Imagen",
      url: `/createquestion/image/${gameid}`,
    },
    {
      id: 3,
      name: "Pintar",
      url: `/createquestion/paint/${gameid}`,
    },
    {
      id: 4,
      name: "Sonidos",
      url: `/createquestion/sound/${gameid}`,
    },
    {
      id: 5,
      name: "Detección de rostros",
      url: `/createquestion/facedetection/${gameid}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 ">
      <div className="w-[40vh] ">
        <div className="bg-white  rounded-xl animate-fade-in">
          <div className=" h-full w-full content-center p-4">
            {/* encabezado */}
            <div className="flex flex-row gap-2 ">
              <h1 className="flex-1 p-2 font-bold text-2xl">
                Tipos de preguntas
              </h1>
              <button
                onClick={CloseTypesQuestion}
                className=" flex flex-row self-end rounded-full bg-red-400 cursor-pointer p-2"
              >
                <span className="font-bold text-white">X</span>
              </button>
            </div>

            <div className="p-4">
              {types.map((type) => (
                <a
                  key={type.id}
                  href={type.url}
                  className="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-2"
                >
                  {type.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
