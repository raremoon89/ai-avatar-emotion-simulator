package com.avatarai.service;

import com.avatarai.model.EmotionLog;
import com.avatarai.model.EmotionRequest;
import com.avatarai.model.EmotionResponse;
import com.avatarai.repository.EmotionLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmotionService {

    private final WebClient webClient;
    private final EmotionLogRepository logRepository;

    public EmotionService(EmotionLogRepository logRepository) {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:8000")  // FastAPI 서버 주소
                .build();
        this.logRepository = logRepository;
    }

    public EmotionResponse analyzeText(String text) {
        EmotionResponse response = webClient.post()
                .uri("/emotion/text")
                .bodyValue(new EmotionRequest(text))
                .retrieve()
                .bodyToMono(EmotionResponse.class)
                .block();

        if (response == null) {
            throw new RuntimeException("FastAPI 서버로부터 유효한 응답을 받지 못했습니다.");
        }

        // DB 저장
        EmotionLog log = new EmotionLog(response.getInput(), response.getEmotion());
        logRepository.save(log);

        return response;
    }
}
