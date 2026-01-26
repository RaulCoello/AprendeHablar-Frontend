import { useState, useEffect } from "react";
import {
  AiTwotoneEdit,
  AiFillDelete,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
export default function QSCAnswers({ onReturnAnswrs }) {
  const [answers, setAnswers] = useState([]);
  const [answerIdEdit, setAnswerIdEdit] = useState(null);
  const [anserEdit, setAnswerEdit] = useState("");
  const [answerAdd, setAnswerAdd] = useState(false);

  const [answerAddop, setAnswerAddop] = useState({ text: "", correct: false });

  const closeAddAnswer = () => {
    setAnswerAdd(false);
    setAnswerAddop({ text: "", correct: false });
  };

  // CRUD con el estado answers
  const addAnswerWithUUID = () => {
    //text = "", correct = false
    const { text, correct } = answerAddop;
    setAnswers((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      const newAnswer = {
        id: lastId + 1,
        text,
        correct,
      };
      return [...prev, newAnswer];
    });
    closeAddAnswer();
  };

  const deleteAnswer = (id) => {
    setAnswers((prev) => prev.filter((a) => a.id !== id));
  };

  const editAnswer = (id, updatedFields) => {
    setAnswers((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a)),
    );
    setAnswerIdEdit(null);
    setAnswerEdit("");
  };

  //Devolver las respuestas cada que cambien
  useEffect(() => {
    onReturnAnswrs(answers);
  }, [answers]);
  return (
    <div className="p-4 grid lg:grid-cols-2 grid-cols-2 gap-10">
      {answers.map((answer, index) => {
        return (
          <div
            key={index}
            className="flex flex-col p-4 gap-2  text-3xl  hover:shadow-xl hover:shadow-lime-900 cursor-pointer items-center justify-center border-8 border-lime-500 rounded-3xl"
          >
            <div className="flex flex-row gap-2 w-full items-center justify-center">
              {answerIdEdit == answer.id ? (
                <>
                  <input
                    value={anserEdit}
                    onChange={(e) => setAnswerEdit(e.target.value)}
                    type="text"
                    className="w-full"
                    placeholder="Editar Respuesta"
                  />
                  <button
                    onClick={() =>
                      editAnswer(answer.id, {
                        text: anserEdit,
                        correct: answer.correct,
                      })
                    }
                    className="z-10 cursor-pointer justify-end items-end bg-green-600 rounded-4xl p-2 font-normal text-lg"
                  >
                    <AiFillCheckCircle className="text-3xl text-white" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className=" flex flex-row gap-2">
                    <input
                      value={answer.text ? answer.text : "Sin Titulo"}
                      //onChange={(e) => setAnswerEdit(e.target.value)}
                      disabled
                      type="text"
                      className="w-full flex-1 p-2 text-start font-bold text-lime-950"
                      placeholder="Editar Respuesta"
                    />
                    <button
                      onClick={() => (
                        setAnswerIdEdit(answer.id),
                        setAnswerEdit(answer.text)
                      )}
                      className="z-10 cursor-pointer justify-end items-end bg-yellow-300 rounded-4xl p-2 font-normal text-lg"
                    >
                      <AiTwotoneEdit className="text-3xl" />
                    </button>
                    <button
                      onClick={() => deleteAnswer(answer.id)}
                      className="z-10 cursor-pointer justify-end items-end bg-red-400 rounded-4xl p-2 font-normal text-lg"
                    >
                      <AiFillDelete className="text-3xl text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      editAnswer(answer.id, {
                        text: answer.text,
                        correct: !answer.correct,
                      })
                    }
                    className={`rounded-2xl cursor-pointer ${answer.correct ? "bg-green-400" : "bg-red-400"} p-2 font-bold text-white`}
                  >
                    {answer.correct ? "Correcta" : "Incorrecta"}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {/* AQUI AGREGAR UNO QUE SEA CEAR UNA NUEVA RESPUESTA */}
      {answerAdd ? (
        <div
          key={0}
          //onClick={() => setOpenTypesQuestions(true)}
          className="flex flex-col p-4 gap-2  text-3xl  cursor-pointer items-center justify-center border-8 border-lime-500 border-dashed rounded-3xl bg-white  hover:border-lime-500/60"
        >
          <div className=" flex flex-row gap-2">
            <input
              onChange={(e) =>
                setAnswerAddop({ ...answerAddop, text: e.target.value })
              }
              value={answerAddop.text}
              type="text"
              className="w-full flex-1 p-2 text-start font-bold text-lime-950"
              placeholder="Agregar respuesta"
            />
            <button
              onClick={() => addAnswerWithUUID()}
              className="z-10 cursor-pointer justify-end items-end bg-green-600 rounded-4xl p-2 font-normal text-lg"
            >
              <AiFillCheckCircle className="text-3xl text-white" />
            </button>
            <button
              onClick={() => closeAddAnswer()}
              className="z-10 cursor-pointer justify-end items-end bg-red-400 rounded-4xl p-2 font-normal text-lg"
            >
              <AiFillCloseCircle className="text-3xl text-white" />
            </button>
          </div>
          <button
            onClick={() =>
              setAnswerAddop({ ...answerAddop, correct: !answerAddop.correct })
            }
            className={`rounded-2xl w-full cursor-pointer ${answerAddop.correct ? "bg-green-400" : "bg-red-400"} p-2 font-bold text-white`}
          >
            {answerAddop.correct ? "Correcta" : "Incorrecta"}
          </button>
        </div>
      ) : (
        <div
          key={0}
          onClick={() => setAnswerAdd(true)}
          className="flex flex-col p-4 gap-2  text-3xl  cursor-pointer items-center justify-center border-8 border-lime-500/30 border-dashed rounded-3xl bg-slate-50 hover:bg-slate-200 hover:border-lime-500/60"
        >
          Nuevo +
        </div>
      )}
    </div>
  );
}
