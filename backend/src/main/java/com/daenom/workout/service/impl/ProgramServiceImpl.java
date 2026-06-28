package com.daenom.workout.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.entity.Program;
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
}
