import React, { useState, useRef, useEffect } from 'react';
import { fetchGroqResponse } from '../api/fetchGroqResponse';
import VoiceInput from "./VoiceInput";

// ⭐️ 별표(*) 안 텍스트(액션/묘사) 제거
function removeStarBlock(str) {
  return str.replace(/\*[^*]+\*/g, '');
}

// 이모지 제거 함수
function removeEmoji(str) {
  return str.replace(/[\u{1F600}-\u{1F9FF}\u{1F300}-\u{1F5FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
}

// 전송(화살표) SVG 아이콘
function SendIcon({ size = 20, color = "#fff" }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 20 20">
      <path d="M3 10h11M11 6l4 4-4 4" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// 마이크 SVG
function MicIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="12" fill="#232323" />
      <path d="M12 15c1.66 0 3-1.34 3-3V8a3 3 0 0 0-6 0v4c0 1.66 1.34 3 3 3zm5-3c0 2.5-2 4.5-5 4.5s-5-2-5-4.5m5 7v-2" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EmotionForm() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [sending, setSending] = useState(false);

  // 추가: speaking(음성 합성 중), toast(토스트 메시지) 상태
  const [speaking, setSpeaking] = useState(false);
  const [toast, setToast] = useState("");

  // 자동 높이 조절
  const textareaRef = useRef(null);

  // 자동 높이 조절
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [text]);

  // AI 답변 말하는 동안 speaking 컨트롤
  useEffect(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    if (last.sender === 'ai') {
      setSpeaking(true);

      const utter = new window.SpeechSynthesisUtterance(last.text);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utter);
    }
  }, [history]);

  // VoiceInput이 결과를 주면 호출될 함수
  const handleVoiceResult = (voiceText) => {
    //setToast("음성 인식 완료! 🥳");
    setTimeout(() => setToast(""), 1500);
    setText(voiceText);
    handleSend(voiceText);
  };

 // 입력할 때마다 textarea 높이 자동 조절
  const handleInput = (e) => {
    setText(e.target.value);
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  // 엔터키(Shift+Enter 제외) 시 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // handleSend에서 text 파라미터로 받을 수 있게 변경
  const handleSend = async (overrideText) => {
    const msg = typeof overrideText === "string" ? overrideText : text;
    if (!msg.trim() || sending || speaking) return;

    setSending(true);
    setTimeout(() => setSending(false), 1000);

    const userMessage = { sender: 'user', text: msg };

    const aiText = await fetchGroqResponse(msg);
    const noStarText = removeStarBlock(aiText);      // 1. 별표 블록 제거
    const cleanAiText = removeEmoji(noStarText);     // 2. 이모지 제거

    const aiResponse = {
      sender: 'ai',
      text: cleanAiText
    };

    setHistory((prev) => [...prev, userMessage, aiResponse]);
    setText('');
  };

   return (
       <div style={{
         width: 360, // 전체 폭 약간 줄이기
         background: '#222',
         borderRadius: 16,
         boxShadow: '0 2px 12px #0006',
         padding: 18,
         marginBottom: 30,
         display: 'flex',
         flexDirection: 'column',
         gap: 10,
         alignItems: 'center',
       }}>
         {/* 토스트 메시지 영역 */}
         {toast && (
           <div style={{
             background: "#444",
             color: "#fff",
             padding: "0.6em 1em",
             borderRadius: "10px",
             marginBottom: "0.7em",
             textAlign: "center",
             position: "relative",
             zIndex: 10,
             fontWeight: "bold"
           }}>
             {toast}
           </div>
         )}

         {/* 채팅 내용 - 절반으로 줄임 */}
         <div style={{
           minHeight: 60,
           maxHeight: 110, // 절반 이하로 줄임
           overflowY: 'auto',
           background: '#18181b',
           borderRadius: 8,
           padding: 8,
           color: '#eee',
           width: '100%',
         }}>
           {history.map((msg, index) => (
             <div key={index} style={{
               textAlign: msg.sender === 'user' ? 'right' : 'left',
               marginBottom: '0.6rem',
               fontSize: '0.97em',
               wordBreak: 'break-all'
             }}>
               <span style={{ fontWeight: 'bold', color: msg.sender === 'user' ? '#cfc' : '#b2c0ff' }}>
                 {msg.sender === 'user' ? '나' : '아바타'}:&nbsp;
               </span>
               <span>{msg.text}</span>
             </div>
           ))}
         </div>

         {/* 입력/버튼 라인 - 한 줄로 정렬 */}
         <div style={{
           display: 'flex',
           width: '100%',
           alignItems: 'center',
           gap: 6,
           marginTop: 6,
           background: '#18181b',
           borderRadius: 8,
           padding: 6,
         }}>
           <input
             type="text"
             placeholder="메시지를 입력하세요"
             value={text}
             onChange={e => setText(e.target.value)}
             onKeyDown={handleKeyDown}
             disabled={speaking || sending}
             style={{
               flex: 1,
               padding: '10px 14px',
               border: 'none',
               outline: 'none',
               background: 'transparent',
               color: '#fff',
               fontSize: 16,
               // 포커스 효과 완전 제거
               boxShadow: 'none',
             }}
           />
           {/* 전송 버튼 - 네모, 깔끔하게 */}
          <button
            onClick={() => handleSend()}
            disabled={speaking || sending}
            style={{
              border: 'none',
              background: '#343434',
              color: '#fff',
              borderRadius: 8,
              minWidth: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 2,
              fontSize: 16,
              fontWeight: 600,
              cursor: speaking || sending ? 'not-allowed' : 'pointer',
              transition: 'background .15s',
              padding: 0,
            }}
          >
            <SendIcon size={22} />
          </button>
           {/* 마이크 버튼 - 아이콘만 동그랗게 */}
           <VoiceInput
             onResult={handleVoiceResult}
             disabled={speaking || sending}
             buttonStyle={{
               border: 'none',
               background: '#343434',
               borderRadius: 8,
               width: 38,
               height: 38,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: speaking || sending ? 'not-allowed' : 'pointer',
               transition: 'background .15s',
               padding: 0,

             }}
           />
         </div>
       </div>
     );
   }

export default EmotionForm;
