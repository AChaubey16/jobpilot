package com.jobpilot.repository;

import com.jobpilot.model.ApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<ApplicationEntity, String> {
    List<ApplicationEntity> findByUserIdOrderByCreatedAtDesc(String userId);
    List<ApplicationEntity> findByUserIdAndStatus(String userId, String status);
    boolean existsByUserIdAndJobId(String userId, String jobId);
}
