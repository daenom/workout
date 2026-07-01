package com.daenom.workout.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daenom.workout.entity.ProgramDay;

public interface ProgramDayRepository extends JpaRepository<ProgramDay, Long> {

    Optional<ProgramDay> findByProgramId(Long programId);

    List<ProgramDay> findAllByProgramId(Long programId);

    List<ProgramDay> findAllByProgramIdOrderByOrderIndexAsc(Long programId);
    
}
