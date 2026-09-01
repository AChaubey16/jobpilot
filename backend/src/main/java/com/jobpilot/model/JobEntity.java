package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private CompanyEntity company;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String location;

    private String experienceReq;

    @Builder.Default
    private Instant postingDate = Instant.now();

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, unique = true, length = 1024)
    private String applicationUrl;

    @Builder.Default
    private String employmentType = "FULL_TIME";
    private String salaryRange;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Builder.Default
    private String atsType = "CUSTOM";

    @Builder.Default
    private Instant createdAt = Instant.now();
}
