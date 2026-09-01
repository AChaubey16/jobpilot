package com.jobpilot.repository;

import com.jobpilot.model.ResumeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<ResumeEntity, String> {
    List<ResumeEntity> findByUserId(String userId);
    Optional<ResumeEntity> findByUserIdAndIsDefaultTrue(String userId);
}
