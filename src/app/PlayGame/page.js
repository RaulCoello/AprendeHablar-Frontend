"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Layout/Navbar";
import Loader from "@/components/Layout/Loader";
import LayoutGame from "@/components/Game/LayoutGame";
import useSpeech from "@/components/hooks/useSpeech";
export default function PlayGame() {
  const { speak, ready } = useSpeech();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const gameid = searchParams.get("game");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [finallyFetch, setFinallyFetch] = useState(false);
  const [viewQuestions, setViewQuestions] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/games/${gameid}/questions/`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data);
      setQuestions(data);
      //setError(null);
    } catch (err) {
      alert("Error al obtener los datos");
      console.log(err);
      //setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
      setFinallyFetch(true);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [gameid]);

  useEffect(() => {
    if (!finallyFetch) return;
    let timer;
    if (finallyFetch) {
      timer = setTimeout(() => {
        setViewQuestions(true);
      }, 1000); // 2 segundos (ajusta el tiempo)
    }
    return () => clearTimeout(timer);
  }, [finallyFetch]);

  /* CARGAR LAS PREGUNTAS DE ESTE JUEGO PARA CONSTRUIR EL LAYOUT*/
  return (
    <div className="p-8">
      {loading && <Loader />} <Navbar />
      {/* <button onClick={() => Empezar()}>Empezar juego</button> */}
      {questions && questions.length !== 0 ? (
        viewQuestions ? (
          <LayoutGame questions={questions} speak={speak} />
        ) : (
          ""
        )
      ) : (
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">No hay niveles creados</h2>
        </div>
      )}
    </div>
  );
}
