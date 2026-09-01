package com.jobpilot.repository;

import com.jobpilot.model.SubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, String> {
    Optional<SubscriptionEntity> findByUserId(String userId);
}
