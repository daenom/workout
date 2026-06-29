package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
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
    public ProgramDayExerciseResponse createProgramDayExercise(CreateProgramDayExerciseRequest request) {
        ProgramDayExercise programDayExercise = programDayExerciseMapper.toEntity(request);
        programDayExercise = programDayExerciseRepository.save(programDayExercise);
        return programDayExerciseMapper.toResponse(programDayExercise);
    }

    @Override
    public List<ProgramDayExerciseResponse> getProgramDayExercises(Long programDayId) {
        List<ProgramDayExercise> programDayExercises = programDayExerciseRepository.findAllByProgramDayIdOrderByOrderIndexAsc(programDayId);
        return programDayExercises.stream()
                .map(programDayExerciseMapper::toResponse)
                .toList();
    }

    @Override
    public ProgramDayExerciseResponse getProgramDayExerciseById(Long id) {
        ProgramDayExercise programDayExercise = programDayExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program day exercise not found"));
        return programDayExerciseMapper.toResponse(programDayExercise);
    }

    @Override
    public ProgramDayExerciseResponse updateProgramDayExercise(Long id, CreateProgramDayExerciseRequest request) {
        ProgramDayExercise programDayExercise = programDayExerciseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program day exercise not found"));
        programDayExercise = programDayExerciseMapper.toEntity(request);
        programDayExercise = programDayExerciseRepository.save(programDayExercise);
        return programDayExerciseMapper.toResponse(programDayExercise);
    }

    @Override
    public void deleteProgramDayExercise(Long id) {
        programDayExerciseRepository.deleteById(id);
    }
}
