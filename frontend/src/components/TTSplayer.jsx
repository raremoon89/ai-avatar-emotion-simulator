// frontend/src/components/TTSPlayer.jsx
import React, { useEffect, useRef } from 'react';

export default function TTSPlayer({ audioBlob }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      audioRef.current.src = url;
      audioRef.current.play();
    }
  }, [audioBlob]);

  return <audio ref={audioRef} controls style={{ marginTop: "1rem" }} />;
}
