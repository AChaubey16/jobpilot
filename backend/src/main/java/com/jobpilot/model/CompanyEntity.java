package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String name;

    private String website;
    @Column(nullable = false)
    private String careerUrl;
    @Builder.Default
    private String atsType = "CUSTOM";
    private String logoUrl;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
