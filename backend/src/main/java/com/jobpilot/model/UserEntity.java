package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String email;

    private String passwordHash;

    @Column(nullable = false)
    private String fullName;

    @Builder.Default
    @Column(nullable = false)
    private String role = "USER";

    @Builder.Default
    @Column(nullable = false)
    private String provider = "LOCAL";

    private String providerId;
    private String phone;
    @Column(columnDefinition = "TEXT")
    private String address;

    private String linkedinUrl;
    private String githubUrl;
    private String portfolioUrl;
    private String currentCompany;
    private String currentRole;

    @Builder.Default
    private Integer experienceYears = 0;
    @Builder.Default
    private Integer noticePeriodDays = 30;
    private String currentCtc;
    private String expectedCtc;

    @Column(columnDefinition = "TEXT")
    private String education;
    @Column(columnDefinition = "TEXT")
    private String skills;

    @Builder.Default
    private Instant createdAt = Instant.now();
    @Builder.Default
    private Instant updatedAt = Instant.now();
}
