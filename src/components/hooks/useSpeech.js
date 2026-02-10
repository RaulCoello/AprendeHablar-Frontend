"use client";
import { useEffect, useRef, useState } from "react";

export default function useSpeech() {
  const synthRef = useRef(null);
  const voiceRef = useRef(null);
  const queueRef = useRef(Promise.resolve()); // cola secuencial
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    synthRef.current = synth;

    const loadVoices = () => {
      const voices = synth.getVoices();

      if (!voices.length) return;

      // 🔥 busca tu voz (flexible)
      const selected =
        voices.find((v) => v.name.includes("Elena")) ||
        voices.find((v) => v.lang.startsWith("es")) ||
        voices[0];

      voiceRef.current = selected;
      setReady(true);
    };

    loadVoices();

    synth.onvoiceschanged = loadVoices;

    // 🔥 unlock audio (política autoplay)
    const unlock = () => {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      synth.speak(u);
      document.removeEventListener("click", unlock);
    };

    document.addEventListener("click", unlock);

    return () => {
      document.removeEventListener("click", unlock);
    };
  }, []);

  // --------------------------------------------------
  // SPEAK (con cola automática)
  // --------------------------------------------------
  const speak = (text) => {
    queueRef.current = queueRef.current.then(
      () =>
        new Promise((resolve) => {
          if (!text || !synthRef.current) return resolve();

          const synth = synthRef.current;

          const utterance = new SpeechSynthesisUtterance(text);

          if (voiceRef.current) {
            utterance.voice = voiceRef.current;
            utterance.lang = voiceRef.current.lang;
          }

          utterance.rate = 1;
          utterance.pitch = 1;

          utterance.onend = resolve;

          utterance.onerror = (e) => {
            // ignorar interrupciones falsas
            if (e.error !== "interrupted") console.error(e);
            resolve();
          };

          synth.speak(utterance);
        }),
    );

    return queueRef.current;
  };

  return { speak, ready };
}
