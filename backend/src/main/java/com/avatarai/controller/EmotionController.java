package com.avatarai.controller;

import com.avatarai.model.EmotionResponse;
import com.avatarai.model.EmotionLog;
import com.avatarai.service.EmotionService;
import com.avatarai.repository.EmotionLogRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emotion")
public class EmotionController {

    private final EmotionService emotionService;
    private final EmotionLogRepository emotionLogRepository;

    public EmotionController(EmotionService emotionService, EmotionLogRepository emotionLogRepository) {
        this.emotionService = emotionService;
        this.emotionLogRepository = emotionLogRepository;
    }

    @PostMapping("/text")
    public EmotionResponse analyze(@RequestParam String text) {
        return emotionService.analyzeText(text);
    }

    @GetMapping("/logs")
    public List<EmotionLog> getLogs() {
        return emotionLogRepository.findAll();
    }
}
