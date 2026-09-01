package com.jobpilot.service;

import com.jobpilot.model.JobEntity;
import com.jobpilot.model.SettingsEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchScoreService {

    public MatchResult calculateMatchScore(JobEntity job, SettingsEntity settings) {
        int score = 0;
        List<String> reasons = new ArrayList<>();

        if (settings == null) {
            return new MatchResult(70, List.of("Default criteria matched"));
        }

        // Location check
        String location = job.getLocation() != null ? job.getLocation().toLowerCase() : "";
        List<String> userLocations = Arrays.stream(settings.getLocations().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .toList();

        boolean locationMatch = userLocations.stream().anyMatch(loc -> location.contains(loc) || loc.contains("remote"));
        if (locationMatch) {
            score += 30;
            reasons.add("Location match (+30%)");
        }

        // Include keywords check
        String descAndTitle = (job.getTitle() + " " + (job.getDescription() != null ? job.getDescription() : "")).toLowerCase();
        List<String> includeKeywords = Arrays.stream(settings.getIncludeKeywords().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isEmpty())
                .toList();

        long matchedCount = includeKeywords.stream().filter(descAndTitle::contains).count();
        if (matchedCount > 0) {
            int keywordPoints = Math.min(50, (int) matchedCount * 10);
            score += keywordPoints;
            reasons.add("Matched " + matchedCount + " required skill keywords (+" + keywordPoints + "%)");
        }

        // Exclude keywords check
        List<String> excludeKeywords = Arrays.stream(settings.getExcludeKeywords().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isEmpty())
                .toList();

        boolean hasExcluded = excludeKeywords.stream().anyMatch(descAndTitle::contains);
        if (hasExcluded) {
            score -= 40;
            reasons.add("Contains excluded domain/role keyword (-40%)");
        } else {
            score += 20;
            reasons.add("No excluded keywords found (+20%)");
        }

        score = Math.max(0, Math.min(100, score));
        return new MatchResult(score, reasons);
    }

    public record MatchResult(int score, List<String> reasons) {}
}
