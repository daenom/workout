package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramDayExerciseMapper;
import com.daenom.workout.repository.ProgramDayExerciseRepository;
import com.daenom.workout.service.ProgramDayExerciseService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgramDayExerciseServiceImpl implements ProgramDayExerciseService {
    private final ProgramDayExerciseRepository programDayExerciseRepository;
    private final ProgramDayExerciseMapper programDayExerciseMapper;

    @Override
    public ProgramDayExercise createProgramDayExercise(CreateProgramDayExerciseRequest request) {
        ProgramDayExercise programDayExercise = programDayExerciseMapper.toEntity(request);
        return programDayExerciseRepository.save(programDayExercise);
    }

    @Override
    public List<ProgramDayExercise> getProgramDayExercises(Long programDayId) {
        return programDayExerciseRepository.findAllByProgramDayIdOrderByOrderIndexAsc(programDayId);
    }

    @Override
    public ProgramDayExercise getProgramDayExerciseById(Long id) {
        return programDayExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program day exercise not found"));
    }

    @Override
    public ProgramDayExercise updateProgramDayExercise(Long id, CreateProgramDayExerciseRequest request) {
        ProgramDayExercise programDayExercise = programDayExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program day exercise not found"));
        programDayExercise = programDayExerciseMapper.toEntity(request);
        return programDayExerciseRepository.save(programDayExercise);
    }

    @Override
    public void deleteProgramDayExercise(Long id) {
        programDayExerciseRepository.deleteById(id);
    }
}
