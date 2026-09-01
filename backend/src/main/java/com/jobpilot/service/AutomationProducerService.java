package com.jobpilot.service;

import com.jobpilot.model.ApplicationEntity;
import com.jobpilot.model.JobEntity;
import com.jobpilot.model.UserEntity;
import com.jobpilot.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AutomationProducerService {

    private final RabbitTemplate rabbitTemplate;
    private final ApplicationRepository applicationRepository;

    @Value("${jobpilot.rabbitmq.exchange:jobpilot.exchange}")
    private String exchange;

    @Value("${jobpilot.rabbitmq.routing-keys.application:jobpilot.application.routing}")
    private String routingKey;

    public void enqueueApplicationAutomation(ApplicationEntity application, UserEntity user, JobEntity job, String resumeUrl) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("jobId", job.getId());
        payload.put("applicationId", application.getId());
        payload.put("userId", user.getId());
        payload.put("companyName", job.getCompany() != null ? job.getCompany().getName() : "Unknown");
        payload.put("targetUrl", job.getApplicationUrl());
        payload.put("atsType", job.getAtsType());
        payload.put("resumeUrl", resumeUrl);
        payload.put("pauseBeforeSubmit", true);

        Map<String, Object> profile = new HashMap<>();
        profile.put("fullName", user.getFullName());
        profile.put("email", user.getEmail());
        profile.put("phone", user.getPhone() != null ? user.getPhone() : "");
        profile.put("address", user.getAddress() != null ? user.getAddress() : "");
        profile.put("linkedIn", user.getLinkedinUrl() != null ? user.getLinkedinUrl() : "");
        profile.put("gitHub", user.getGithubUrl() != null ? user.getGithubUrl() : "");
        profile.put("portfolio", user.getPortfolioUrl() != null ? user.getPortfolioUrl() : "");
        profile.put("currentCompany", user.getCurrentCompany() != null ? user.getCurrentCompany() : "");
        profile.put("currentRole", user.getCurrentRole() != null ? user.getCurrentRole() : "");
        profile.put("experienceYears", user.getExperienceYears() != null ? user.getExperienceYears() : 5);
        profile.put("noticePeriodDays", user.getNoticePeriodDays() != null ? user.getNoticePeriodDays() : 30);
        profile.put("currentCtc", user.getCurrentCtc() != null ? user.getCurrentCtc() : "");
        profile.put("expectedCtc", user.getExpectedCtc() != null ? user.getExpectedCtc() : "");
        profile.put("education", user.getEducation() != null ? user.getEducation() : "");
        profile.put("skills", user.getSkills() != null ? List.of(user.getSkills().split(",")) : List.of("Java", "Spring Boot"));

        payload.put("userProfile", profile);

        log.info("Enqueueing automation payload for application ID: {}", application.getId());
        rabbitTemplate.convertAndSend(exchange, routingKey, payload);

        application.setStatus("QUEUED");
        applicationRepository.save(application);
    }
}
