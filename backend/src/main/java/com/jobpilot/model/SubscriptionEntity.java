package com.jobpilot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Builder.Default
    private String plan = "PREMIUM_ANNUAL";

    @Builder.Default
    private String status = "ACTIVE";

    private String gateway;
    private String gatewaySubscriptionId;

    private Instant startsAt;
    private Instant expiresAt;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
