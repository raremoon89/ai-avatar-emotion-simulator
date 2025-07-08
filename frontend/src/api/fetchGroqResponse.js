export async function fetchGroqResponse(userText) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama3-70b-8192", // 또는 mixtral-8x7b
      messages: [
              {
                role: "system",
                content: "너는 친근하고 정중한 AI 아바타야. 오직 한국어로만 자연스럽게 대답해줘. 한자, 일본어, 영어, 이모지 등은 사용하지 마."
              },
              { role: "user", content: userText }
            ],
            temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Groq 응답을 받을 수 없어요.";
}
