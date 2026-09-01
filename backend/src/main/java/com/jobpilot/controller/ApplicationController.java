package com.jobpilot.controller;

import com.jobpilot.model.ApplicationEntity;
import com.jobpilot.repository.ApplicationRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@Tag(name = "Applications", description = "Track job application statuses and automation progress")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;

    @GetMapping
    @Operation(summary = "Get all applications for the logged-in user")
    public ResponseEntity<List<ApplicationEntity>> getApplications(Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(applicationRepository.findByUserIdOrderByCreatedAtDesc(userId));
    }
}
