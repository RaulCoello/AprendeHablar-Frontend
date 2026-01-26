"use client";

import { useState, useEffect } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("Hola, este es un ejemplo de texto a voz.");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  // Voz mas natural
  //Microsoft Elena Online (Natural) - Spanish (Argentina)

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);

      // Elegir una voz en español por defecto
      const spanish = v.find((voice) => voice.lang.startsWith("es"));
      if (spanish) setSelectedVoice(spanish.name);
    };

    loadVoices();

    // Algunos navegadores cargan las voces de forma asíncrona
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.lang = "es-ES";
    utterance.rate = 1; // velocidad (0.5 - 2)
    utterance.pitch = 1; // tono (0 - 2)

    // Detener cualquier voz anterior
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h3>Texto a Voz (sin internet)</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        style={{ width: "100%" }}
      />
      <span>
        Voz seleccionada: <span className="font-black">{selectedVoice}</span>
      </span>
      <div style={{ marginTop: 10 }}>
        <label>Voz: </label>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices
            .filter((v) => v.lang.startsWith("es"))
            .map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
        </select>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={speak}>🔊 Hablar</button>
        <button onClick={stop} style={{ marginLeft: 10 }}>
          ⏹️ Detener
        </button>
      </div>
    </div>
  );
}
