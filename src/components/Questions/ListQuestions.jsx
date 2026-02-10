import { useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import TypeQuestions from "./TypeQuestions";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function ListQuestions({
  questions,
  gameid,
  reload,
  setLoading,
}) {
  const [openTypesQuestions, setOpenTypesQuestions] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const Delete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `${apiUrl}/questions/${id}/`,
        {},
        {
          /*
        headers: {
          "Content-Type": "application/json",
        }, */
          withCredentials: false,
        },
      );
      reload();
      setLoading(false);
    } catch (error) {
      alert("Error al eliminar la pregunta");
      console.log(error);
    }
  };
  // funcion para enviar a editar una pregunta segun su tipo
  const EditQuestionLink = (id, type) => {
    //alert(`id: ${id} type: ${type}`);
    switch (type) {
      case "selection_text":
        router.push(
          `/editquestion/selectiontext?questionid=${id}&gameid=${gameid}`,
        );
        break;
      case "image":
        router.push(`/editquestion/image?questionid=${id}&gameid=${gameid}`);
        break;

      case "paint": // se envia a la de selection_text porque es practiamente lo mismo, solo cambia cuando se va a contestar la pregunta xd
        router.push(
          `/editquestion/selectiontext?questionid=${id}&gameid=${gameid}`,
        );
        break;

      case "sound": // se envia a la de selection_text porque es practiamente lo mismo, solo cambia cuando se va a contestar la pregunta xd
        router.push(`/editquestion/sound?questionid=${id}&gameid=${gameid}`);
        break;

      case "face": // aunque es face se envia como imagen a editar porque es lo mismo
        router.push(`/editquestion/image?questionid=${id}&gameid=${gameid}`);
        break;

      default:
        alert("Tipo de pregunta no soportada aun");
    }
  };
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
              <div className="flex flex-row gap-2 w-full items-center justify-center">
                <input
                  className="flex-1 p-2 text-start font-bold text-lime-950 w-full"
                  type="text"
                  value={question.title ? question.title : "Sin Titulo"}
                  disabled
                />
                <button
                  onClick={() =>
                    EditQuestionLink(question.id, question.type_question)
                  }
                  className="z-10 cursor-pointer justify-end items-end bg-yellow-300 rounded-4xl p-2 font-normal text-lg"
                >
                  <AiTwotoneEdit className="text-3xl" />
                </button>
                <button
                  onClick={() => Delete(question.id)}
                  className="z-10 cursor-pointer justify-end items-end bg-red-400 rounded-4xl p-2 font-normal text-lg"
                >
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
