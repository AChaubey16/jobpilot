package com.jobpilot.controller;

import com.jobpilot.repository.ApplicationRepository;
import com.jobpilot.repository.JobRepository;
import com.jobpilot.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "System metrics, user management, and queue monitoring")
public class AdminController {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    @GetMapping("/metrics")
    @Operation(summary = "Get high-level SaaS platform system metrics")
    public ResponseEntity<?> getMetrics() {
        return ResponseEntity.ok(Map.of(
                "totalUsers", userRepository.count(),
                "totalJobsIndexed", jobRepository.count(),
                "totalApplicationsProcessed", applicationRepository.count(),
                "systemStatus", "HEALTHY"
        ));
    }
}
