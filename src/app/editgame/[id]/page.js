"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import Navbar from "@/components/Layout/Navbar";
import Loader from "@/components/Layout/Loader";
import ListQuestions from "@/components/Questions/ListQuestions";
export default function EditGamePage() {
  const params = useParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState([]);
  //funcion para obtener la lista de preguntas del juego
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/games/${id}/questions/`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setQuestions(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [id]);
  return (
    <div className="p-8">
      {loading && <Loader />}
      <Navbar />
      {/* LISTAR LAS PREGUNTAS EN FORMA DE GRID DE 1 COLUMNA */}
      <ListQuestions
        questions={questions}
        gameid={id}
        reload={fetchQuestions}
        setLoading={setLoading}
      />
    </div>
  );
}
