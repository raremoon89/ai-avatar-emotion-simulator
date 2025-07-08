package com.avatarai.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EmotionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String input;
    private String emotion;

    private LocalDateTime createdAt;

    public EmotionLog() {
        this.createdAt = LocalDateTime.now();
    }

    public EmotionLog(String input, String emotion) {
        this.input = input;
        this.emotion = emotion;
        this.createdAt = LocalDateTime.now();
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }

    public String getInput() { return input; }
    public void setInput(String input) { this.input = input; }

    public String getEmotion() { return emotion; }
    public void setEmotion(String emotion) { this.emotion = emotion; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
