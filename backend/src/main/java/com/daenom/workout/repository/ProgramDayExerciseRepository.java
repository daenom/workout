package com.daenom.workout.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.daenom.workout.entity.ProgramDayExercise;

public interface ProgramDayExerciseRepository extends JpaRepository<ProgramDayExercise, Long> {

    List<ProgramDayExercise> findAllByProgramDayIdOrderByOrderIndexAsc(Long programDayId);
    
    List<ProgramDayExercise> findAllByProgramDayId(Long programDayId);

    @Query("SELECT e FROM ProgramDayExercise e JOIN FETCH e.exercise " +
           "WHERE e.programDayId IN :dayIds " +
           "ORDER BY e.programDayId ASC, e.orderIndex ASC")
    List<ProgramDayExercise> findByProgramDayIdIn(@Param("dayIds") List<Long> dayIds);
}
