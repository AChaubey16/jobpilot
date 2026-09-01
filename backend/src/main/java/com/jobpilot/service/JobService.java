package com.jobpilot.service;

import com.jobpilot.model.*;
import com.jobpilot.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final SettingsRepository settingsRepository;
    private final MatchScoreService matchScoreService;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final AutomationProducerService automationProducerService;

    public List<JobEntity> getAllRecentJobs() {
        Instant threeDaysAgo = Instant.now().minus(3, ChronoUnit.DAYS);
        return jobRepository.findByPostingDateAfterOrderByPostingDateDesc(threeDaysAgo);
    }

    public List<JobEntity> searchJobs(String query) {
        if (query == null || query.isBlank()) {
            return getAllRecentJobs();
        }
        return jobRepository.searchJobs(query);
    }

    public MatchScoreService.MatchResult calculateMatchForUser(String jobId, String userId) {
        JobEntity job = jobRepository.findById(jobId).orElseThrow();
        SettingsEntity settings = settingsRepository.findByUserId(userId).orElse(null);
        return matchScoreService.calculateMatchScore(job, settings);
    }

    @Transactional
    public ApplicationEntity applyToJob(String jobId, String userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow();
        JobEntity job = jobRepository.findById(jobId).orElseThrow();

        if (applicationRepository.existsByUserIdAndJobId(userId, jobId)) {
            throw new IllegalStateException("Already applied or application in progress for this job.");
        }

        SettingsEntity settings = settingsRepository.findByUserId(userId).orElse(null);
        MatchScoreService.MatchResult matchResult = matchScoreService.calculateMatchScore(job, settings);

        ResumeEntity resume = resumeRepository.findByUserIdAndIsDefaultTrue(userId)
                .orElseGet(() -> resumeRepository.findByUserId(userId).stream().findFirst().orElse(null));

        ApplicationEntity application = ApplicationEntity.builder()
                .user(user)
                .job(job)
                .resume(resume)
                .status("DISCOVERED")
                .matchScore(matchResult.score())
                .matchReasons(String.join("; ", matchResult.reasons()))
                .build();

        application = applicationRepository.save(application);

        String resumeUrl = resume != null ? resume.getFilePath() : "default_resume.pdf";
        automationProducerService.enqueueApplicationAutomation(application, user, job, resumeUrl);

        return application;
    }
}
