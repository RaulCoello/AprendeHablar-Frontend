"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Layout/Navbar";
import Loader from "@/components/Layout/Loader";
import QSCBody from "@/components/QuestionsTypes/Selection/Create/QSCBody";
import QDCAnswers from "@/components/QuestionsTypes/Sound/Create/QDCAnswers";
import { AiFillSave } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SoundQuestion() {
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /*
    Funcion para crear
    1. Crear la pregunta y retornar su id
    2. Con ese id recorrer las respuestas y crearlas
  */
  const [Body, setBody] = useState({});
  const [Answers, setAnswers] = useState([]);
  const SaveQuestion = async () => {
    try {
      //console.log("Guardar pregunta de seleccion");
      //console.log(Body);
      // enviar la peticion POST para crear la pregunta y retornar el id causa
      setLoading(true);
      const form = new FormData();
      form.set("title", Body.title);
      form.set("indication", Body.indication);
      form.set("type_question", "sound"); // --> AQUI CAMBIAR EL TIPO DE PREGUNTA PARA EL SWITCH QUE RENDERIZA EL TIPO DE PREGUNTA PARA EL JUEGO
      form.set("type_resource", "img");
      form.set("number_question", 1); // por defecto 1 luego se puede arreglar por backend para se seleccione el ultimo + 1
      form.set("game_id", id);
      form.set("image", Body.image);
      // AQUI UTILIZAR AXIOS PARA ENVIAR EL FORM
      const result = await axios.post(`${apiUrl}/questions/`, form, {
        /*
        headers: {
          "Content-Type": "application/json",
        }, */
        withCredentials: false,
      });
      const questionId = result.data.id;

      //--------------------------------------------
      // ahora recorrer las respuestas y crearlas
      for (let i = 0; i < Answers.length; i++) {
        const ansForm = new FormData();
        //console.log(Answers[i].text + " - " + Answers[i].correct);
        ansForm.set("text", Answers[i].text || "");
        ansForm.set("correct", Answers[i].correct ? "True" : "False");
        ansForm.set("question_id", questionId);
        //agregar el color de la respuesta
        ansForm.set("color", Answers[i].color);
        // fileE
        ansForm.set("sound", Answers[i].fileE);

        if (Answers[i].fileEI) {
          ansForm.set("answer_image", Answers[i].fileEI);
        }

        const resulta = await axios.post(`${apiUrl}/answers/`, ansForm, {
          /*
        headers: {
          "Content-Type": "application/json",
        }, */
          withCredentials: false,
        });
        //console.log(resulta.data);
      }

      setLoading(false);
      // si todo sale bien entonces regresar a las preguntas del juego
      router.push(`/editgame/${id}`);
    } catch (error) {
      alert("error al crear la pregunta");
      console.log(error);
      setLoading(false);
    }
  };
  const ReturnBody = (body) => {
    setBody(body);
  };
  const ReturnAnswers = (answers) => {
    setAnswers(answers);
  };
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
          <button
            onClick={() => SaveQuestion()}
            className="z-10 cursor-pointer justify-end  items-end bg-blue-600 rounded-4xl p-3 font-normal text-lg"
          >
            <AiFillSave className="text-3xl text-white" />
          </button>
        </div>
        {/* CUERPO DONDE VA LA PREGUNTA */}
        <QSCBody onReturnBody={ReturnBody} />
        {/* AQUI VAN LAS OPCIONES DE RESPUESTA  */}
        <QDCAnswers onReturnAnswrs={ReturnAnswers} />
      </div>
    </div>
  );
}
