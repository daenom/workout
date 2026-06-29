package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramMapper;
import com.daenom.workout.repository.ProgramRepository;
import com.daenom.workout.service.ProgramService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProgramServiceImpl implements ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramMapper programMapper;

    @Override
    public ProgramResponse createProgram(CreateProgramRequest request) {
        Program program = programMapper.toEntity(request);
        program = programRepository.save(program);
        return programMapper.toResponse(program);
    }

    @Override
    public List<ProgramResponse> getAllPrograms() {
        List<Program> programs = programRepository.findAll();
        return programs.stream()
                .map(programMapper::toResponse)
                .toList();
    }

    @Override
    public ProgramResponse getProgramById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        return programMapper.toResponse(program);
    }

    @Override
    public ProgramResponse updateProgram(Long id, CreateProgramRequest request) {
        Program existingProgram = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        existingProgram.setName(request.name());
        existingProgram.setDescription(request.description());
        
        Program updatedProgram = programRepository.save(existingProgram);
        return programMapper.toResponse(updatedProgram);
    }

    @Override
    public void deleteProgram(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        programRepository.delete(program);
    }
}
