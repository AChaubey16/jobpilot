package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private JobEntity job;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    private ResumeEntity resume;

    @Builder.Default
    @Column(nullable = false)
    private String status = "DISCOVERED";

    @Builder.Default
    private Integer matchScore = 0;

    @Column(columnDefinition = "TEXT")
    private String matchReasons;

    @Column(columnDefinition = "TEXT")
    private String screenshots;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private Instant appliedAt;

    @Builder.Default
    private Instant createdAt = Instant.now();
    @Builder.Default
    private Instant updatedAt = Instant.now();
}
