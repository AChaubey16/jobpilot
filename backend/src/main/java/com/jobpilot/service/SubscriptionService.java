package com.jobpilot.service;

import com.jobpilot.model.SubscriptionEntity;
import com.jobpilot.model.UserEntity;
import com.jobpilot.repository.SubscriptionRepository;
import com.jobpilot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionEntity getSubscription(String userId) {
        return subscriptionRepository.findByUserId(userId)
                .orElse(null);
    }

    @Transactional
    public SubscriptionEntity subscribeUser(String userId, String gateway) {
        UserEntity user = userRepository.findById(userId).orElseThrow();

        SubscriptionEntity subscription = subscriptionRepository.findByUserId(userId)
                .orElseGet(() -> SubscriptionEntity.builder().user(user).build());

        Instant now = Instant.now();
        subscription.setPlan("PREMIUM_ANNUAL");
        subscription.setStatus("ACTIVE");
        subscription.setGateway(gateway);
        subscription.setGatewaySubscriptionId(gateway.toLowerCase() + "_sub_" + System.currentTimeMillis());
        subscription.setStartsAt(now);
        subscription.setExpiresAt(now.plus(365, ChronoUnit.DAYS));

        return subscriptionRepository.save(subscription);
    }

    public Map<String, Object> createOrder(String userId, String gateway) {
        return Map.of(
                "orderId", gateway.toLowerCase() + "_order_" + System.currentTimeMillis(),
                "amount", 99900, // ₹999 in paise
                "currency", "INR",
                "key", "rzp_test_mock_key_jobpilot"
        );
    }
}
