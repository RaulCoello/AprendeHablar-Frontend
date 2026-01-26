"use client";
import React from "react";
import Image from "next/image";
import CreateGame from "./CreateGame";
import EditGame from "./EditGame";
import { useState, useEffect } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";

export function ListGames({ games, admin, recargar }) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiMedia = process.env.NEXT_PUBLIC_API_MEDIA;

  const [showCreateGame, setShowCreateGame] = useState(false);
  const [showEditGame, setShowEditGame] = useState(false);
  const [gameToEdit, setGameToEdit] = useState(null);
  const HandleOpenEdit = (game) => {
    setGameToEdit(game);
    setShowEditGame(true);
  };
  // funcion para activar el tts
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

  // funcion para ir a editar las preguntas o jugarlas
  const handleGameClick = async (gametitle, gameid) => {
    // Texto que quieres que diga
    const text = admin
      ? `Vas a editar el juego ${gametitle}`
      : `Vas a jugar el juego ${gametitle}`;

    // Esperar a que termine de hablar
    await speak(text);

    // Después de que termina el speak, continúan las acciones
    if (admin) {
      router.push(`/editgame/${gameid}`);
    } else {
      router.push(`/PlayGame?game=${gameid}`);
    }
  };

  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  return (
    <div>
      {showCreateGame && (
        <CreateGame
          cerrar={() => setShowCreateGame(false)}
          recargar={() => (recargar(), setShowCreateGame(false))}
        />
      )}
      {showEditGame && (
        <EditGame
          game={gameToEdit}
          cerrar={() => setShowEditGame(false)}
          recargar={() => (recargar(), setShowEditGame(false))}
        />
      )}

      <div className="p-4 grid lg:grid-cols-2 grid-cols-2 gap-10">
        {games.map((game, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                handleGameClick(game.title ? game.title : "Sin Titulo", game.id)
              }
              className="flex flex-col p-4 gap-2  text-3xl hover:text-4xl hover:shadow-2xl hover:shadow-lime-900 cursor-pointer items-center justify-center border-8 border-lime-500 rounded-3xl"
              style={{ backgroundColor: game.color || "#65a30d" }}
            >
              <div>
                {game.image ? (
                  <img
                    src={`${apiMedia}/${game.image}`}
                    alt="Next.js logo"
                    width={200}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/duo2.png"
                    alt="Next.js logo"
                    width={200}
                    height={20}
                    priority
                  />
                )}
              </div>
              <div className="flex flex-row w-full items-center justify-center">
                <h1 className="flex-1 p-2 text-center font-bold text-white">
                  {game.title ? game.title : "Sin Titulo"}
                </h1>
                {admin && (
                  <button
                    onClick={(e) => (e.stopPropagation(), HandleOpenEdit(game))}
                    className="z-10 cursor-pointer justify-end items-end bg-yellow-300 rounded-4xl p-2 font-normal text-lg"
                  >
                    <AiTwotoneEdit className="text-3xl" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {/* AQUI AGREGAR UNO QUE SEA CEAR UN NUEVO JUEGO */}
        {admin && (
          <div
            key={0}
            onClick={() => setShowCreateGame(true)}
            className="flex flex-col p-4 gap-2  text-3xl  cursor-pointer items-center justify-center border-8 border-lime-500/30 border-dashed rounded-3xl bg-slate-50 hover:bg-slate-200 hover:border-lime-500/60"
          >
            Nuevo +
          </div>
        )}
      </div>
    </div>
  );
}
