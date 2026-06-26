package com.daenom.workout.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByName(String name);
}
