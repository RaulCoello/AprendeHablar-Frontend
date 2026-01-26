import React from "react";

export default function Progres({ numTotal, actual }) {
  const percent = ((actual - 1) / numTotal) * 100;
  return (
    <div className="flex flex-col p-3 rounded-2xl bg-amber-200 gap-3">
      <h1 className="font-bold text-2xl p-2">
        Nivel {actual} de {numTotal}
      </h1>
      <div className="grid grid-cols-12 ">
        {Array.from({ length: numTotal }).map((_, index) => (
          <div
            key={index}
            className={`rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold
                ${index + 1 <= actual ? "bg-orange-500 text-white" : "bg-slate-200 text-black"}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {/*Aqui un progrees bar  */}
      <div className="w-full h-4 bg-slate-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
