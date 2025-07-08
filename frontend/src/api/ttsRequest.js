export async function requestTTS(text) {
  try {
    const response = await fetch("http://localhost:5000/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      console.error("TTS 서버 응답 오류:", response.status);
      return null;
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("TTS 요청 실패:", error);
    return null;
  }
}
