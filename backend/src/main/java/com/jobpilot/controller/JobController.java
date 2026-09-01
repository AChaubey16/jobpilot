package com.jobpilot.controller;

import com.jobpilot.model.JobEntity;
import com.jobpilot.service.JobService;
import com.jobpilot.service.MatchScoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Jobs", description = "Job discovery, match score calculation, and application dispatch")
public class JobController {

    private final JobService jobService;

    @GetMapping
    @Operation(summary = "Get newly posted jobs filtered by age")
    public ResponseEntity<List<JobEntity>> getJobs(@RequestParam(required = false) String search) {
        return ResponseEntity.ok(jobService.searchJobs(search));
    }

    @GetMapping("/{id}/match-score")
    @Operation(summary = "Calculate transparent match score for logged-in user")
    public ResponseEntity<MatchScoreService.MatchResult> getMatchScore(@PathVariable String id, Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(jobService.calculateMatchForUser(id, userId));
    }

    @PostMapping("/{id}/apply")
    @Operation(summary = "Trigger Playwright automation application process")
    public ResponseEntity<?> applyToJob(@PathVariable String id, Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(jobService.applyToJob(id, userId));
    }
}
