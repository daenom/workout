package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.program.CreateProgramRequest;
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
    public Program createProgram(CreateProgramRequest request) {
        Program program = programMapper.toEntity(request);
        return programRepository.save(program);
    }

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    public Program getProgramById(Long id) {
        return programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
    }

    @Override
    public Program updateProgram(Long id, CreateProgramRequest request) {
        Program existingProgram = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        existingProgram.setName(request.name());
        existingProgram.setDescription(request.description());
        
        return programRepository.save(existingProgram);
    }

    @Override
    public void deleteProgram(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        programRepository.delete(program);
    }
}
