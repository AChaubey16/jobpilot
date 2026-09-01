package com.jobpilot.repository;

import com.jobpilot.model.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<JobEntity, String> {
    Optional<JobEntity> findByApplicationUrl(String applicationUrl);
    List<JobEntity> findByPostingDateAfterOrderByPostingDateDesc(Instant date);

    @Query("SELECT j FROM JobEntity j WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(j.location) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<JobEntity> searchJobs(String query);
}
