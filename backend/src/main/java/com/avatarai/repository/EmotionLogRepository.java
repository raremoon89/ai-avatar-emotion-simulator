package com.avatarai.repository;

import com.avatarai.model.EmotionLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmotionLogRepository extends JpaRepository<EmotionLog, Long> {
    // Custom query methods can be added if needed
}
