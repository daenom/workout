package com.daenom.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.WorkoutSession;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Long> {
    
}
