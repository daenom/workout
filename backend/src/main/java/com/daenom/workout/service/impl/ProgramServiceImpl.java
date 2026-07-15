package com.daenom.workout.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramDetails;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayDetails;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.entity.Program;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.entity.User;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramMapper;
import com.daenom.workout.repository.ProgramDayExerciseRepository;
import com.daenom.workout.repository.ProgramDayRepository;
import com.daenom.workout.repository.ProgramRepository;
import com.daenom.workout.service.ProgramDayService;
import com.daenom.workout.service.ProgramService;
import com.daenom.workout.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProgramServiceImpl implements ProgramService {
    private final ProgramRepository programRepository;
    private final ProgramDayRepository programDayRepository;
    private final ProgramDayExerciseRepository programDayExerciseRepository;
    private final ProgramMapper programMapper;

    private final ProgramDayService programDayService;
    private final UserService userService;

    @Override
    public CreateProgramResponse createProgram(CreateProgramRequest request, String email) {
        User user = userService.getUserByEmail(email);
        Program program = programMapper.toEntity(request.name(), request.description(), user);
        Program savedProgram = programRepository.save(program);
        Long programId = savedProgram.getId();

        for(CreateProgramDayRequest dayRequest : request.days()) {
            programDayService.createProgramDay(dayRequest, programId);
        }

        return programMapper.toResponse(savedProgram);
    }

    @Override
    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public ProgramResponse getProgramById(Long programId) {
        // 1. Fetch main program metadata safely
        Program program = programRepository.findById(programId)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

    String creator = program.getUser().getFirstname();

        // 2. Query #1: Fetch all days at once in a flat list
        List<ProgramDay> days = programDayRepository.findAllByProgramIdOrderByOrderIndexAsc(programId);
        List<Long> dayIds = days.stream().map(ProgramDay::getId).toList();

        // 3. Query #2: Batch-fetch all exercises for all active day IDs in one swoop
        List<ProgramDayExercise> allExercises = dayIds.isEmpty() ? 
            List.of() : programDayExerciseRepository.findByProgramDayIdIn(dayIds);

        // Group the flat list into a fast key-value memory map [Day ID -> List of Exercises]
        Map<Long, List<ProgramDayExercise>> exercisesByDayId = allExercises.stream()
            .collect(Collectors.groupingBy(ProgramDayExercise::getProgramDayId));

        // 4. Transform the data smoothly into clean frontend DTO models
        List<ProgramDayResponse> dayResponses = days.stream().map(day -> {
            List<ProgramDayExercise> dayExercises = exercisesByDayId.getOrDefault(day.getId(), List.of());
            
            List<ProgramDayExerciseResponse> exerciseResponses = dayExercises.stream()
                .map(e -> new ProgramDayExerciseResponse(
                    e.getId(),
                    e.getExercise().getId(),
                    e.getExercise().getName(),
                    e.getOrderIndex(),
                    e.getSets()
                )).toList();

            return new ProgramDayResponse(
                day.getId(),
                day.getName(),
                day.getDescription(),
                day.getProgramDayType(),
                day.getOrderIndex(),
                exerciseResponses
            );
        }).toList();

        return new ProgramResponse(
            program.getId(),
            program.getName(),
            program.getDescription(),
            creator,
            program.getCreatedAt(),
            program.getUpdatedAt(),
            dayResponses
        );
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
        
        programDayService.deleteProgramDaysByProgramId(id);
        programRepository.delete(program);
    }

    @Override
    public ProgramDetails getProgramDetailsById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Program not found with id: " + id));
        
        List<ProgramDayDetails> programDays = programDayService.getProgramDayDetailsByProgramId(id);
        return new ProgramDetails(program, programDays);
    }
}
