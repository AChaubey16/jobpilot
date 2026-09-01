package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SettingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Builder.Default
    private Integer minExp = 5;
    @Builder.Default
    private Integer maxExp = 8;

    @Column(columnDefinition = "TEXT")
    @Builder.Default
    private String locations = "Mumbai, Pune, Bengaluru, Hyderabad, Remote";

    @Builder.Default
    private Integer maxPostingAgeDays = 3;

    @Column(columnDefinition = "TEXT")
    @Builder.Default
    private String includeKeywords = "Java, Spring Boot, Backend, Microservices, Kafka, Redis, Docker, AWS";

    @Column(columnDefinition = "TEXT")
    @Builder.Default
    private String excludeKeywords = "Frontend, Angular, React, Android, QA, Support, Internship, Contract, Freelance";

    @Builder.Default
    private Boolean autoSubmitEnabled = false;

    @Builder.Default
    private Boolean pauseBeforeSubmit = true;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
