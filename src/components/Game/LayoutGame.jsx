"use client";
import { useState, useEffect } from "react";
import Progres from "./Progres";
import QSRQuestion from "../QuestionsTypes/Selection/Resolve/QSRQuestion";
import QIRQuestion from "../QuestionsTypes/Image/Resolve/QIRQuestion";
import QPRQuestion from "../QuestionsTypes/Paint/Resolve/QPRQuestion";
import CorrectOp from "./CorrectOp";
import GameOver from "./GameOver";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function LayoutGame({ questions }) {
  //{questions.length}

  const total_number_question = questions.length;
  const [questions_resolved, setQuestions_resolved] = useState([]);
  // hacer una copia de las questions para ir resolviendo
  const [questions_copy, setQuestions_copy] = useState([...questions]);
  const [opSelect, setOpSelect] = useState({
    is_correct: false,
    open: false,
  });

  const [current_question, setCurrent_question] = useState({
    id: null,
    title: "",
    indication: "",
    resource: "",
    type_question: "",
    type_resource: "",
    number_question: null,
  });
  // la primer vez que salga esta pantalla se debe cargar la primer pregunta
  useEffect(() => {
    if (questions.length > 0) {
      setCurrent_question(questions_copy[0]);
    }
  }, []);

  // funcion para avanzar el progreso
  const addResolveQuestion = () => {
    setQuestions_resolved((prev) => {
      const newQuestion = {
        id: 1,
        text: "",
        correct: "",
      };
      return [...prev, newQuestion];
    });
    // eliminar la primer pregunta de questions_copy
    if (questions_copy.length === 1) return;
    // aqui mostrar la animacion

    setQuestions_copy((prev) => prev.slice(1));
  };

  // cada que se haga un cambio en questions_copy se debe actualizar la current_question
  useEffect(() => {
    if (questions.length > 0) {
      setCurrent_question(questions_copy[0]);
    }
  }, [questions_copy]);

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const speak = (text) => {
    return new Promise((resolve) => {
      if (!text) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      const voice = voices.find(
        (v) =>
          v.name === "Microsoft Elena Online (Natural) - Spanish (Argentina)",
      );

      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "es-ES";
        console.warn("No se encontró esa voz, usando voz por defecto");
      }

      utterance.rate = 1;
      utterance.pitch = 2;

      // cuando termine de hablar, resolvemos la Promise
      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = () => {
        console.error("Error en speech synthesis");
        resolve(); // para no bloquear el flujo
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    });
  };
  /*
  SIMULACINO:
  {current_question.title}
      <button onClick={() => addResolveQuestion()}>Simular</button>
  */
  // hacer una funcion que traiga la primer y siguente pregunta
  //questions_copy --> utilizar la copia porque se tiene que ir eliminando las preguntas ya resueltas
  // enviar tambien si la op es correcta o no para avanzar e indicar al jogador
  const aceptar = async (opSelect, is_correct) => {
    // Texto que quieres que diga
    const text = opSelect || "";
    // Esperar a que termine de hablar
    await speak(text);

    //Abrir la ventana para ver si la respuesta es correcta o no
    setOpSelect({ ...CorrectOp, is_correct: is_correct, open: true });

    // cuando termine de hablar avanzar a la siguiente pregunta
    //if (is_correct) addResolveQuestion();
  };

  const closeopSelect = () => {
    setOpSelect({ ...CorrectOp, is_correct: false, open: false });
    if (opSelect.is_correct) {
      addResolveQuestion();
    }
  };
  //opSelect.is_correct

  // switch para mostrar el layout de las respuestas segun corresponde al tipo de pregunta
  //current_question
  const RenderTypeAnswer = () => {
    const type = current_question.type_question;

    switch (type) {
      case "selection_text":
        return (
          <QSRQuestion
            question={current_question}
            aceptar={aceptar}
            speak={speak}
          />
        );
      case "image":
        return (
          <QIRQuestion
            question={current_question}
            aceptar={aceptar}
            speak={speak}
          />
        );
      case "paint":
        return (
          <QPRQuestion
            question={current_question}
            aceptar={aceptar}
            speak={speak}
          />
        );

      default:
        return (
          <div className="mx-auto text-center p-2 bg-red-400 mt-5 rounded-3xl flex flex-row items-center justify-items-center bg-center self-center justify-center content-center">
            <span className="text-white font-bold flex p-2  items-center">
              <AiOutlineExclamationCircle className="text-4xl mx-2 text-white" />
              Tipo:
              <span className="p-1 mx-1 bg-red-300 text-black rounded-2xl">
                {type}
              </span>
              no disponible de momento
            </span>
          </div>
        );
    }
  };
  return (
    <div>
      {opSelect.open ? (
        <CorrectOp is_correct={opSelect.is_correct} close={closeopSelect} />
      ) : (
        ""
      )}
      {/* MOSTRAR UNA WEA QUE INDIQUE QUE SE TERMINO EL JOGA BONITO */}
      {questions_resolved.length + 1 > total_number_question ? (
        <GameOver puntos={total_number_question} />
      ) : (
        ""
      )}
      <Progres
        numTotal={total_number_question}
        actual={questions_resolved.length + 1}
      />

      {/* UTILIZAR UN SWITCH PARA RENDERIZAR EL TIPO DE PREGUNTA */}
      {RenderTypeAnswer()}
      {/* <button onClick={() => addResolveQuestion()}>Simular</button> */}
    </div>
  );
}
