package com.daenom.workout.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daenom.workout.dto.program.CreateProgramRequest;
import com.daenom.workout.dto.program.CreateProgramResponse;
import com.daenom.workout.dto.program.ProgramResponse;
import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.dto.programDayExercise.ProgramDayExerciseResponse;
import com.daenom.workout.entity.Exercise;
import com.daenom.workout.entity.Program;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.entity.User;
import com.daenom.workout.exception.AccessDeniedException;
import com.daenom.workout.exception.InvalidExerciseReferenceException;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramDayExerciseMapper;
import com.daenom.workout.mapper.ProgramDayMapper;
import com.daenom.workout.mapper.ProgramMapper;
import com.daenom.workout.repository.ExerciseRepository;
import com.daenom.workout.repository.ProgramDayExerciseRepository;
import com.daenom.workout.repository.ProgramDayRepository;
import com.daenom.workout.repository.ProgramRepository;
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
    private final ExerciseRepository exerciseRepository;
    private final ProgramMapper programMapper;
    private final ProgramDayMapper programDayMapper;
    private final ProgramDayExerciseMapper programDayExerciseMapper;

    private final UserService userService;

    @Override
    @Transactional
    public CreateProgramResponse createProgram(CreateProgramRequest request, String email) {
        // 1. Get user context
        User user = userService.getUserByEmail(email);
        
        // 2. Step 1 Optimization: Gather all exercise IDs up-front to prevent the N+1 read loop
        Set<Long> allExerciseIds = Optional.ofNullable(request.days()).orElse(List.of()).stream()
                .flatMap(day -> Optional.ofNullable(day.exercises()).orElse(List.of()).stream())
                .map(CreateProgramDayExerciseRequest::exerciseId)
                .collect(Collectors.toSet());

        // Batch fetch all required master exercises in 1 single query
        List<Exercise> masterExercises = exerciseRepository.findAllById(allExerciseIds);
        Map<Long, Exercise> exerciseMap = masterExercises.stream()
            .collect(Collectors.toMap(Exercise::getId, ex -> ex));

        // Validate that all incoming exercise IDs actually exist in our DB
        if (exerciseMap.size() != allExerciseIds.size()) {
            throw new InvalidExerciseReferenceException("One or more invalid exercise IDs provided.");
        }

        // 3. Save parent Program
        Program program = programMapper.toEntity(request.name(), request.description(), user);
        Program savedProgram = programRepository.save(program);
        Long programId = savedProgram.getId();

        // Staging lists for batch saving later
        List<ProgramDayExercise> exercisesToSave = new ArrayList<>();

        // 4. Process Days
        for (CreateProgramDayRequest dayRequest : Optional.ofNullable(request.days()).orElse(List.of())) {
            // Map and save the day to get its ID (necessary for linking exercises relational style)
            ProgramDay programDay = programDayMapper.toEntity(dayRequest, programId);
            ProgramDay savedDay = programDayRepository.save(programDay);

            // 5. Build the list of exercises for this day in memory
            for (CreateProgramDayExerciseRequest exRequest : Optional.ofNullable(dayRequest.exercises()).orElse(List.of())) {
                Exercise exercise = exerciseMap.get(exRequest.exerciseId()); // Blazing fast memory map lookup
                
                ProgramDayExercise programDayExercise = programDayExerciseMapper.toEntity(
                    exRequest, 
                    exercise, 
                    savedDay.getId()
                );
                exercisesToSave.add(programDayExercise);
            }
        }

        // 6. Step 2 Optimization: Batch-insert ALL exercises across ALL days in one single DB command
        if (!exercisesToSave.isEmpty()) {
            programDayExerciseRepository.saveAll(exercisesToSave);
        }

        return new CreateProgramResponse(savedProgram.getId(), savedProgram.getName());
    }

    @Override
    @Transactional(readOnly = true)
    public ProgramResponse getProgramById(Long programId, String email) {
        User user = userService.getUserByEmail(email);

        // 1. Fetch main program metadata safely
        Program program = programRepository.findById(programId)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

        if (!program.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not own this program");
        }

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
    @Transactional
    public CreateProgramResponse updateProgram(Long programId, CreateProgramRequest request, String email) {
        User user = userService.getUserByEmail(email);

        Program program = programRepository.findById(programId)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

        if (!program.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not own this program");
        }

        // Validate exercise IDs up front, same as create
        Set<Long> allExerciseIds = Optional.ofNullable(request.days()).orElse(List.of()).stream()
                .flatMap(day -> Optional.ofNullable(day.exercises()).orElse(List.of()).stream())
                .map(CreateProgramDayExerciseRequest::exerciseId)
                .collect(Collectors.toSet());

        List<Exercise> masterExercises = exerciseRepository.findAllById(allExerciseIds);
        Map<Long, Exercise> exerciseMap = masterExercises.stream()
            .collect(Collectors.toMap(Exercise::getId, ex -> ex));

        if (exerciseMap.size() != allExerciseIds.size()) {
            throw new InvalidExerciseReferenceException("One or more invalid exercise IDs provided.");
        }

        // Update program-level fields
        program.setName(request.name());
        program.setDescription(request.description());
        programRepository.save(program);

        // Delete-and-recreate: DB cascade handles program_day_exercise cleanup automatically
        // when program_day rows are deleted, so we only need to delete at the program_day level.
        List<ProgramDay> existingDays = programDayRepository.findAllByProgramIdOrderByOrderIndexAsc(programId);
        if (!existingDays.isEmpty()) {
            programDayRepository.deleteAll(existingDays);
        }

        // Recreate days + exercises — identical to createProgram's steps 4-6
        List<ProgramDayExercise> exercisesToSave = new ArrayList<>();
        for (CreateProgramDayRequest dayRequest : Optional.ofNullable(request.days()).orElse(List.of())) {
            ProgramDay programDay = programDayMapper.toEntity(dayRequest, programId);
            ProgramDay savedDay = programDayRepository.save(programDay);

            for (CreateProgramDayExerciseRequest exRequest : Optional.ofNullable(dayRequest.exercises()).orElse(List.of())) {
                Exercise exercise = exerciseMap.get(exRequest.exerciseId());
                exercisesToSave.add(programDayExerciseMapper.toEntity(exRequest, exercise, savedDay.getId()));
            }
        }

        if (!exercisesToSave.isEmpty()) {
            programDayExerciseRepository.saveAll(exercisesToSave);
        }

        return new CreateProgramResponse(program.getId(), program.getName());
    }

    @Override
    @Transactional
    public void deleteProgram(Long programId, String email) {
        User user = userService.getUserByEmail(email);

        Program program = programRepository.findById(programId)
            .orElseThrow(() -> new ResourceNotFoundException("Program not found"));

        if (!program.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You do not own this program");
        }

        programRepository.delete(program);
        // DB cascade (program_id -> program_day -> program_day_exercise) handles the rest.
    }
}
