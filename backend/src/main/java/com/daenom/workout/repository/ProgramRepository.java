package com.daenom.workout.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.Program;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    
}
