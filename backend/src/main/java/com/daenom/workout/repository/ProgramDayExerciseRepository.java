package com.daenom.workout.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.ProgramDayExercise;

public interface ProgramDayExerciseRepository extends JpaRepository<ProgramDayExercise, Long> {

    List<ProgramDayExercise> findAllByProgramDayIdOrderByOrderIndexAsc(Long programDayId);
    
    List<ProgramDayExercise> findAllByProgramDayId(Long programDayId);
}
