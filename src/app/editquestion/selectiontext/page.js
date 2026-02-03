"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Layout/Loader";
import Navbar from "@/components/Layout/Navbar";
import QSEBody from "@/components/QuestionsTypes/Selection/Edit/QSEBody";
import QSEAnswers from "@/components/QuestionsTypes/Selection/Edit/QSEAnswers";
import { AiFillSave } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function EditQuestion() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [bodyData, setBodyData] = useState({});
  const [answera, setAnswers] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionid = searchParams.get("questionid");
  const gameid = searchParams.get("gameid");

  const ReturnBody = (body) => {
    setBodyData(body);
  };

  const ReturnAnswers = (anwers) => {
    setAnswers(anwers);
  };

  // enviar a editar o crear nuevas preguntas
  const EditQuestion = async () => {
    try {
      // mandar a editar la pregunta
      setLoading(true);
      const form = new FormData();
      form.set("title", bodyData.title);
      form.set("indication", bodyData.indication);
      //form.set("game_id", id);
      form.set("image", bodyData.resource);
      // AQUI UTILIZAR AXIOS PARA ENVIAR EL FORM
      await axios.post(`${apiUrl}/questions/${questionid}/`, form, {
        withCredentials: false,
      });

      // recorrer las respuestas para editarlas o crearlas
      for (let i = 0; i < answera.length; i++) {
        const item = answera[i];

        if (item.is_new !== undefined) {
          // La propiedad existe (aunque sea true o false)
          // Crear
          const ansForm = new FormData();
          //console.log(Answers[i].text + " - " + Answers[i].correct);
          ansForm.set("text", item.answer);
          ansForm.set("correct", item.is_correct ? "True" : "False");
          ansForm.set("question_id", questionid);
          ansForm.set("color", item.color);
          await axios.post(`${apiUrl}/answers/`, ansForm, {
            withCredentials: false,
          });
        } else {
          // La propiedad NO existe
          // Editar
          const ansForm = new FormData();
          //console.log(Answers[i].text + " - " + Answers[i].correct);
          ansForm.set("answer", item.answer);
          ansForm.set("is_correct", item.is_correct ? "True" : "False");
          ansForm.set("question_id", questionid);
          ansForm.set("color", item.color);
          await axios.post(`${apiUrl}/answers/${item.id}/`, ansForm, {
            withCredentials: false,
          });
        }
      }

      setLoading(false);
      router.push(`/editgame/${gameid}`);
    } catch (error) {
      alert("Error al editar la pregunta");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {loading && <Loader />} <Navbar />
      {/* INTERFAZ PARA CREAR EL JUEGO */}
      <div className="flex flex-col gap-3">
        {/* ENCABEZADO */}
        <div className="flex flex-row gap-2 rounded-2xl p-4 bg-yellow-100">
          <h1 className="flex-1 font-bold text-2xl items-center justify-center content-center">
            Guardar cambios
          </h1>
          <button
            onClick={() => EditQuestion()}
            className="z-10 cursor-pointer justify-end  items-end bg-blue-600 rounded-4xl p-3 font-normal text-lg"
          >
            <AiFillSave className="text-3xl text-white" />
          </button>
        </div>
        {/* CUERPO DONDE VA LA PREGUNTA  <QSCBody onReturnBody={ReturnBody} />*/}
        <QSEBody
          onReturnBody={ReturnBody}
          id={questionid}
          setLoading={setLoading}
        />
        {/* AQUI VAN LAS OPCIONES DE RESPUESTA */}
        <QSEAnswers
          onReturnAnswrs={ReturnAnswers}
          id={questionid}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}
