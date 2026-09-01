package com.jobpilot.controller;

import com.jobpilot.service.SubscriptionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/subscription")
@RequiredArgsConstructor
@Tag(name = "Subscription", description = "₹999/yr subscription checkout and status APIs")
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    @GetMapping
    @Operation(summary = "Get current subscription status")
    public ResponseEntity<?> getSubscription(Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(subscriptionService.getSubscription(userId));
    }

    @PostMapping("/create-order")
    @Operation(summary = "Initialize Razorpay/Stripe checkout order")
    public ResponseEntity<?> createOrder(@RequestParam(defaultValue = "RAZORPAY") String gateway, Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(subscriptionService.createOrder(userId, gateway));
    }

    @PostMapping("/verify-payment")
    @Operation(summary = "Confirm payment and activate annual premium subscription")
    public ResponseEntity<?> verifyPayment(@RequestParam(defaultValue = "RAZORPAY") String gateway, Authentication auth) {
        String userId = auth.getName();
        return ResponseEntity.ok(subscriptionService.subscribeUser(userId, gateway));
    }
}
