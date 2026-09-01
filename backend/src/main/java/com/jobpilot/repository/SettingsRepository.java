package com.jobpilot.repository;

import com.jobpilot.model.SettingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SettingsRepository extends JpaRepository<SettingsEntity, String> {
    Optional<SettingsEntity> findByUserId(String userId);
}
