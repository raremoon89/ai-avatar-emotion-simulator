// src/components/VoiceInput.jsx
import { useState, useRef } from "react";

function MicIcon({ size = 22, color = "#fff" }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 20 20">
      <rect width="20" height="20" rx="10" fill="none"/>
      <path d="M10 14c1.4 0 2.5-1.1 2.5-2.5V7.5a2.5 2.5 0 1 0-5 0v4c0 1.4 1.1 2.5 2.5 2.5zm4-2.5c0 2-1.6 3.5-4 3.5s-4-1.5-4-3.5m4 5v-1.2"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }
    if (!listening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "ko-KR"; // 한글
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onResult(text);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
    } else {
      recognitionRef.current && recognitionRef.current.stop();
      setListening(false);
    }
  };

  return (
   <button onClick={handleMicClick} style={{ marginLeft: 8 }}>
     <MicIcon size={22} color={listening ? "#42a5f5" : "#fff"} />
   </button>
  );
}
