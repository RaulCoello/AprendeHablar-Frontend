"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Layout/Navbar";
import Loader from "@/components/Layout/Loader";
import LayoutGame from "@/components/Game/LayoutGame";
export default function PlayGame() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const searchParams = useSearchParams();
  const gameid = searchParams.get("game");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/games/${gameid}/questions/`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setQuestions(data);
      //setError(null);
    } catch (err) {
      alert("Error al obtener los datos");
      console.log(err);
      //setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [gameid]);
  /* CARGAR LAS PREGUNTAS DE ESTE JUEGO PARA CONSTRUIR EL LAYOUT*/
  return (
    <div className="p-8">
      {loading && <Loader />} <Navbar />
      {questions && questions.length !== 0 ? (
        <LayoutGame questions={questions} />
      ) : (
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">No hay niveles creados</h2>
        </div>
      )}
    </div>
  );
}
