import { useState, useEffect, useRef } from "react";
import {
  AiFillDelete,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineFormatPainter,
  AiOutlineUpload,
} from "react-icons/ai";
import Image from "next/image";
import SelectColor from "../../Selection/Create/SelectColor";

export default function QDEAnswers({ onReturnAnswrs, id, setLoading }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;
  const [answers, setAnswers] = useState([]);
  const [answerIdEdit, setAnswerIdEdit] = useState(null);
  const [anserEdit, setAnswerEdit] = useState("");
  const [answerAdd, setAnswerAdd] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [answerAddop, setAnswerAddop] = useState({
    text: "",
    correct: false,
    color: "#fb923c",
    fileP: null,
    fileE: null,
    filePI: null,
    fileEI: null,
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
    const { text, correct, color, fileP, fileE, filePI, fileEI } = answerAddop;
    setAnswers((prev) => {
      const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
      const newAnswer = {
        id: lastId + 1,
        answer: text,
        is_correct: correct,
        is_new: true,
        color: color,
        fileP,
        fileE,
        filePI,
        fileEI,
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
    //console.log(answers);
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

  // SOUND ANSWER CREATE Y EDIT ------------------------------------------------------------
  //sound CREATE-------------------
  const fileInputRef = useRef(null);
  const ImagePreview = (e) => {
    try {
      //setFileP(URL.createObjectURL(e.target.files[0]));
      const setFileP = URL.createObjectURL(e.target.files[0]);

      const selectedFile = e.target.files[0];
      //NOsetFile(selectedFile);
      //setFileE(selectedFile);
      setAnswerAddop({ ...answerAddop, fileE: selectedFile, fileP: setFileP });
      //console.log(answerAddop);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Activa el input de tipo "file"
    }
  };
  // fin sound CREATE --------------

  //sound EDIT-------------------
  const fileInputRefE = useRef(null);
  const ImagePreviewE = (e) => {
    //alert(`ID a editar: ${answerIdEdit}`);
    try {
      //setFileP(URL.createObjectURL(e.target.files[0]));
      const setFileP = URL.createObjectURL(e.target.files[0]);
      const selectedFile = e.target.files[0];

      //setAnswerAddop({ ...answerAddop, fileE: selectedFile, fileP: setFileP }); --> Enviar a editar segun el id que se recibe

      // revisar si tiene la propiedad new,
      // si no tiene la propiedad new entonces vino de la BD por lo tanto no se puede editar
      // fileE ni fileP, en ese caso hay que empujarle esas propiedades

      editAnswer(answerIdEdit, {
        fileE: selectedFile,
        fileP: setFileP,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClickE = () => {
    if (fileInputRefE.current) {
      fileInputRefE.current.click(); // Activa el input de tipo "file"
    }
  };
  // fin sound EDIT --------------
  // END SOUND ANSWER CREATE Y EDIT ------------------------------------------------------------

  // -------------------------------------------------------------
  // IMAGE ANSWER CREATE Y EDIT ------------------------------------------------------------
  //image CREATE-------------------
  const fileInputRefI = useRef(null);
  const ImagePreviewI = (e) => {
    try {
      //setFileP(URL.createObjectURL(e.target.files[0]));
      const setFileP = URL.createObjectURL(e.target.files[0]);

      const selectedFile = e.target.files[0];
      //NOsetFile(selectedFile);
      //setFileE(selectedFile);
      setAnswerAddop({
        ...answerAddop,
        fileEI: selectedFile,
        filePI: setFileP,
      });
      //console.log(answerAddop);
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClickI = () => {
    if (fileInputRefI.current) {
      fileInputRefI.current.click(); // Activa el input de tipo "file"
    }
  };
  // fin image CREATE --------------

  //image EDIT-------------------
  const fileInputRefEI = useRef(null);
  const ImagePreviewEI = (e) => {
    //alert(`ID a editar: ${answerIdEdit}`);
    try {
      //setFileP(URL.createObjectURL(e.target.files[0]));
      const setFileP = URL.createObjectURL(e.target.files[0]);
      const selectedFile = e.target.files[0];

      editAnswer(answerIdEdit, {
        fileEI: selectedFile,
        filePI: setFileP,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleButtonClickEI = () => {
    if (fileInputRefEI.current) {
      fileInputRefEI.current.click(); // Activa el input de tipo "file"
    }
  };
  // fin image EDIT --------------
  // END IMAGE ANSWER CREATE Y EDIT ------------------------------------------------------------

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
                <div className="flex flex-col gap-2">
                  <div className=" flex flex-col gap-2">
                    {/* Si no ha subido una imagen entonces mostrar una por default */}
                    {answer.answer_image && !answer.filePI ? (
                      <img
                        src={`${apiBase}/media/${answer.answer_image}`}
                        alt="Imagen"
                        className="mt-3 h-64 w-64  mx-auto"
                      />
                    ) : !answer.filePI ? (
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
                        src={answer.filePI}
                        alt="Imagen"
                        className="mt-3 h-64 w-64  mx-auto"
                      />
                    )}

                    {/* el boton para cambiar la imagen */}
                    <div className="mx-auto w-4/6">
                      <input
                        type="file"
                        id="fileInput"
                        onChange={ImagePreviewEI}
                        accept="image/png, .jpeg, .gif, .jpg"
                        className="hidden"
                        ref={fileInputRefEI}
                      />

                      <button
                        className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-yellow-500 rounded-4xl p-2 w-full font-normal text-lg"
                        onClick={() => (
                          setAnswerIdEdit(answer.id),
                          handleButtonClickEI()
                        )} // aqui hay que enviar el id de la op que se va a cambiar la imagen
                      >
                        <AiOutlineUpload className=" font-bold text-3xl text-black" />
                      </button>
                    </div>

                    {/* Si no ha subido una sonido entonces mostrar una imagen por default */}

                    {answer.sound && !answer.fileP ? (
                      <audio src={`${apiBase}media/${answer.sound}`} controls />
                    ) : !answer.fileP ? (
                      <div className="mx-auto">
                        <Image
                          src="/sound_icon.png"
                          alt="Next.js logo"
                          width={200}
                          height={20}
                          priority
                        />
                      </div>
                    ) : (
                      <audio src={answer.fileP} controls />
                    )}

                    <div className="grid grid-cols-3 gap-2 ">
                      <input
                        type="file"
                        id="fileInput"
                        onChange={ImagePreviewE}
                        accept=".m4a, .mp3, .ogg"
                        className="hidden"
                        ref={fileInputRefE}
                      />

                      <button
                        className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-yellow-300 rounded-4xl p-2 font-normal text-lg"
                        onClick={() => (
                          setAnswerIdEdit(answer.id),
                          handleButtonClickE()
                        )} // aqui hay que enviar el id de la op que se va a cambiar la imagen
                      >
                        <AiOutlineUpload className=" font-bold text-3xl text-black" />
                      </button>

                      <button
                        className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center  rounded-4xl p-2 font-normal text-lg"
                        style={{ backgroundColor: answer.color || "#fb923c" }}
                        onClick={() => (
                          setActualColor(answer.color || "#fb923c"),
                          setOpenColor(true),
                          setAnswerEditColor(answer.id)
                        )}
                      >
                        <AiOutlineFormatPainter className="text-3xl text-white" />
                      </button>
                      <button
                        onClick={() => deleteAnswer(answer.id)}
                        className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-red-400 rounded-4xl p-2 font-normal text-lg"
                      >
                        <AiFillDelete className="text-3xl text-white" />
                      </button>
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
              {/* Si no ha subido una imagen entonces mostrar una por default */}
              {answerAddop.answer_image && !answerAddop.filePI ? (
                <img
                  src={`${apiBase}/media/${answerAddop.answer_image}`}
                  alt="Imagen"
                  className="mt-3 h-64 w-64  mx-auto"
                />
              ) : !answerAddop.filePI ? (
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
                  src={answerAddop.filePI}
                  alt="Imagen"
                  className="mt-3 h-64 w-64  mx-auto"
                />
              )}

              {/* el boton para cambiar la imagen */}
              <div className="mx-auto w-4/6">
                <input
                  type="file"
                  id="fileInput"
                  onChange={ImagePreviewI}
                  accept="image/png, .jpeg, .gif, .jpg"
                  className="hidden"
                  ref={fileInputRefI}
                />

                <button
                  className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-yellow-500 rounded-4xl p-2 w-full font-normal text-lg"
                  onClick={handleButtonClickI}
                >
                  <AiOutlineUpload className=" font-bold text-3xl text-black" />
                </button>
              </div>

              {/* Si no ha subido un sonido entonces mostrar una imagen por default */}
              {!answerAddop.fileP ? (
                <div className="mx-auto">
                  <Image
                    src="/sound_icon.png"
                    alt="Next.js logo"
                    width={150}
                    height={20}
                    priority
                    className="p-2"
                  />
                </div>
              ) : (
                <audio src={answerAddop.fileP} controls />
              )}

              <div className="grid grid-cols-4 gap-2 ">
                <button
                  onClick={() => addAnswerWithUUID()}
                  className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-green-600 rounded-4xl p-2 font-normal text-lg"
                >
                  <AiFillCheckCircle className="text-3xl text-white" />
                </button>

                <input
                  type="file"
                  id="fileInput"
                  onChange={ImagePreview}
                  accept=".m4a, .mp3, .ogg"
                  className="hidden"
                  ref={fileInputRef}
                />

                <button
                  className=" z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-green-600 rounded-4xl p-2 font-normal text-lg"
                  onClick={handleButtonClick}
                >
                  <AiOutlineUpload className=" font-bold text-3xl text-white" />
                </button>

                <button
                  onClick={() => (
                    setActualColor(answerAddop.color),
                    setOpenColor(true)
                  )}
                  className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center  rounded-4xl p-2 font-normal text-lg"
                  style={{ backgroundColor: answerAddop.color || "#fb923c" }}
                >
                  <AiOutlineFormatPainter className="text-3xl text-white" />
                </button>
                <button
                  onClick={() => closeAddAnswer()}
                  className="z-10 cursor-pointer flex justify-center items-center text-center content-center self-center bg-red-400 rounded-4xl p-2 font-normal text-lg"
                >
                  <AiFillCloseCircle className="text-3xl text-white" />
                </button>
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
