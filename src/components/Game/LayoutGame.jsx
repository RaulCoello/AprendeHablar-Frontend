"use client";
import { useState, useEffect } from "react";
import Progres from "./Progres";
import QSRQuestion from "../QuestionsTypes/Selection/Resolve/QSRQuestion";

export default function LayoutGame({ questions }) {
  //{questions.length}

  const total_number_question = questions.length;
  const [questions_resolved, setQuestions_resolved] = useState([]);
  // hacer una copia de las questions para ir resolviendo
  const [questions_copy, setQuestions_copy] = useState([...questions]);
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
  const aceptar = async (opSelect) => {
    // Texto que quieres que diga
    const text = opSelect;

    // Esperar a que termine de hablar
    await speak(text);
  };
  return (
    <div>
      <Progres
        numTotal={total_number_question}
        actual={questions_resolved.length + 1}
      />
      {/* UTILIZAR UN SWITCH PARA RENDERIZAR EL TIPO DE PREGUNTA */}
      <QSRQuestion question={current_question} aceptar={aceptar} />
      <button onClick={() => addResolveQuestion()}>Simular</button>
    </div>
  );
}
