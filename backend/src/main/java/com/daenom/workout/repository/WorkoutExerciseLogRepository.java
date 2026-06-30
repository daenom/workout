package com.daenom.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.WorkoutExerciseLog;

public interface WorkoutExerciseLogRepository extends JpaRepository<WorkoutExerciseLog, Long> {
    
}
