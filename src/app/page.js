"use client";

import { useState, useEffect } from "react";
import { ListGames } from "../components/Game/ListGames";
import Loader from "../components/Layout/Loader";
import Config from "@/components/Layout/Config";
import Cookies from "universal-cookie";
import Navbar from "@/components/Layout/Navbar";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // const searchParams = useSearchParams();
  // const config = searchParams.get("config"); ///?config=admin
  // tomar la cookie para ver si esta en modo admin o modo user
  const cookies = new Cookies();
  const cookieAdminMode = cookies.get("adminMode");

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(false);

  // Función asíncrona para obtener datos
  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/games/`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      //console.log(data);
      setGames(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    //setAdmin(config === "admin");
    setAdmin(cookieAdminMode || false);
  }, []);

  //if (loading) return <div>Cargando...</div>;
  if (error)
    return (
      <div>
        Error: {error} {apiUrl}
      </div>
    );
  return (
    <div className="p-8">
      {loading && <Loader />}
      <Config adminMode={admin} />
      <Navbar />
      {/* Mostrar la lista de juegos en formato de grid  */}
      <ListGames games={games} admin={admin} recargar={fetchGames} />
      {/* colocar un boton flotante para entrar al modo de adminstracion de los juegos*/}
    </div>
  );
}
