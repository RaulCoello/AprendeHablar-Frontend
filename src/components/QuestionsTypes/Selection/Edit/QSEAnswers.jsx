import { useState, useEffect } from "react";
import {
  AiTwotoneEdit,
  AiFillDelete,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFormatPainter,
} from "react-icons/ai";
import SelectColor from "../Create/SelectColor";

export default function QSEAnswers({ onReturnAnswrs, id, setLoading }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [answers, setAnswers] = useState([]);
  const [answerIdEdit, setAnswerIdEdit] = useState(null);
  const [anserEdit, setAnswerEdit] = useState("");
  const [answerAdd, setAnswerAdd] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [answerAddop, setAnswerAddop] = useState({
    text: "",
    correct: false,
    color: "#fb923c",
  });
  const [actualColor, setActualColor] = useState("");
  const [answerEditColor, setAnswerEditColor] = useState(null);
  const closeAddAnswer = () => {
    setAnswerAdd(false);
    setAnswerAddop({ text: "", correct: false });
  };

  // CRUD con el estado answers
  const addAnswerWithUUID = () => {
    //text = "", correct = false
    const { text, correct, color } = answerAddop;
    setAnswers((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      const newAnswer = {
        id: lastId + 1,
        answer: text,
        is_correct: correct,
        is_new: true,
        color: color,
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

  const fetchData = async () => {
    try {
      setLoading(true);
      // cargar los datos de la pregunta
      const response = await fetch(`${apiUrl}/answers/${id}/question/`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setAnswers(data);
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

  const colorset = (color) => {
    setOpenColor(false);
    // preguntar si se va agregar el color para una nueva opcion o para editar una existente
    if (answerEditColor)
      editAnswer(answerEditColor, {
        color: color,
      });
    else setAnswerAddop({ ...answerAddop, color: color });

    setAnswerEditColor(null);
  };
  return (
    <>
      {openColor && (
        <SelectColor
          close={() => setOpenColor(false)}
          colorset={colorset}
          actualColor={actualColor}
        />
      )}

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
                          answer: anserEdit,
                          is_correct: answer.is_correct,
                        })
                      }
                      className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-green-600 rounded-4xl p-2 font-normal text-lg"
                    >
                      <AiFillCheckCircle className="text-3xl text-white" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className=" flex flex-col gap-2">
                      <input
                        value={answer.answer ? answer.answer : "Sin Titulo"}
                        //onChange={(e) => setAnswerEdit(e.target.value)}
                        disabled
                        type="text"
                        className="w-full flex-1 p-2 text-start font-bold text-lime-950"
                        placeholder="Editar Respuesta"
                      />

                      <div className="flex flex-row  gap-3">
                        <button
                          className="z-10 flex-1  cursor-pointer flex justify-center items-center text-center content-center self-center  rounded-4xl p-2 font-normal text-lg"
                          style={{ backgroundColor: answer.color || "#fb923c" }}
                          onClick={() => (
                            setActualColor(answer.color || "#fb923c"),
                            setOpenColor(true),
                            setAnswerEditColor(answer.id)
                          )}
                        >
                          <AiOutlineFormatPainter className="text-3xl text-white" />
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            onClick={() => (
                              setAnswerIdEdit(answer.id),
                              setAnswerEdit(answer.answer)
                            )}
                            className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-transparent rounded-4xl p-2 font-normal text-lg"
                          >
                            <AiTwotoneEdit className="text-3xl" />
                          </button>

                          <button
                            onClick={() => deleteAnswer(answer.id)}
                            className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-transparent rounded-4xl p-2 font-normal text-lg"
                          >
                            <AiFillDelete className="text-3xl text-red-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        editAnswer(answer.id, {
                          answer: answer.answer,
                          is_correct: !answer.is_correct,
                        })
                      }
                      className={`rounded-2xl cursor-pointer ${answer.is_correct ? "bg-green-400" : "bg-red-400"} p-2 font-bold text-white`}
                    >
                      {answer.is_correct ? "Correcta" : "Incorrecta"}
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
            <div className=" flex flex-col gap-2">
              <input
                onChange={(e) =>
                  setAnswerAddop({ ...answerAddop, text: e.target.value })
                }
                value={answerAddop.text}
                type="text"
                className="w-full flex-1 p-2 text-start font-bold text-lime-950"
                placeholder="Agregar respuesta"
              />

              <div className="flex flex-row gap-3">
                <button
                  onClick={() => (
                    setActualColor(answerAddop.color),
                    setOpenColor(true)
                  )}
                  className="flex-1 z-10 cursor-pointer flex justify-center items-center text-center content-center self-center  rounded-4xl p-2 font-normal text-lg"
                  style={{ backgroundColor: answerAddop.color || "#fb923c" }}
                >
                  <AiOutlineFormatPainter className="text-3xl text-white" />
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => addAnswerWithUUID()}
                    className="z-10 cursor-pointer justify-end items-end bg-green-600 rounded-4xl p-2 font-normal text-lg"
                  >
                    <AiFillCheckCircle className="text-3xl text-white" />
                  </button>
                  <button
                    onClick={() => closeAddAnswer()}
                    className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-red-400 rounded-4xl p-2 font-normal text-lg"
                  >
                    <AiFillCloseCircle className="text-3xl text-white" />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() =>
                setAnswerAddop({
                  ...answerAddop,
                  correct: !answerAddop.correct,
                })
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
    </>
  );
}
