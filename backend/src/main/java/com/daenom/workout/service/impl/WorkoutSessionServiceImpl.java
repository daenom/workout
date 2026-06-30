package com.daenom.workout.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.workoutSession.ActiveSessionResponse;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.entity.WorkoutExerciseLog;
import com.daenom.workout.entity.WorkoutSession;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.model.ExerciseSet;
import com.daenom.workout.model.LoggedSet;
import com.daenom.workout.model.enums.WorkoutStatus;
import com.daenom.workout.repository.WorkoutExerciseLogRepository;
import com.daenom.workout.repository.WorkoutSessionRepository;
import com.daenom.workout.service.ProgramDayExerciseService;
import com.daenom.workout.service.ProgramDayService;
import com.daenom.workout.service.WorkoutSessionService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkoutSessionServiceImpl implements WorkoutSessionService {
    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutExerciseLogRepository workoutExerciseLogRepository;

    private final ProgramDayService programDayService;
    private final ProgramDayExerciseService programDayExerciseService;

    @Override
    public ActiveSessionResponse initializeSession(Long userId, Long programDayId) {
        ProgramDay programDay = programDayService.getProgramDayById(programDayId);
        
        WorkoutSession workoutSession = WorkoutSession.builder()
            .userId(userId)
            .programId(programDay.getProgramId())
            .programDayId(programDayId)
            .status(WorkoutStatus.IN_PROGRESS)
            .startTime(LocalDateTime.now())
            .build();

        workoutSessionRepository.save(workoutSession);

        List<ProgramDayExercise> programDayExercises = programDayExerciseService.getProgramDayExercises(programDayId);
        List<WorkoutExerciseLog> workoutExerciseLogs = new ArrayList<>();

        for(ProgramDayExercise programDayExercise : programDayExercises){
            List<LoggedSet> initialSets = new ArrayList<>();

            for(ExerciseSet set: programDayExercise.getSets()){
                LoggedSet loggedSet = new LoggedSet(set.getSetNumber(), set.getMinReps(), set.getTargetWeight(), false);
                initialSets.add(loggedSet);
            }

            WorkoutExerciseLog workoutExerciseLog = WorkoutExerciseLog.builder()
                .workoutSessionId(workoutSession.getId())
                .exerciseId(programDayExercise.getExerciseId())
                .orderIndex(programDayExercise.getOrderIndex())
                .loggedSets(initialSets)
                .build();

            workoutExerciseLogs.add(workoutExerciseLogRepository.save(workoutExerciseLog));
        }
        return new ActiveSessionResponse(workoutSession, workoutExerciseLogs);
    }

    @Override
    public void endWorkoutSession(Long sessionId) {
        WorkoutSession workoutSession = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout session not found"));
        workoutSession.setStatus(WorkoutStatus.COMPLETED);
        workoutSession.setEndTime(LocalDateTime.now());
        workoutSessionRepository.save(workoutSession);
    }

    @Override
    public void updateWorkoutLog(Long logId, LoggedSet loggedSet) {
        WorkoutExerciseLog workoutExerciseLog = workoutExerciseLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Workout exercise log not found"));
        Integer setNumber = loggedSet.getSetNumber();
        List<LoggedSet> loggedSets = workoutExerciseLog.getLoggedSets();
        for(LoggedSet existingSet : loggedSets) {
            if(existingSet.getSetNumber().equals(setNumber)) {
                existingSet.setReps(loggedSet.getReps());
                existingSet.setWeight(loggedSet.getWeight());
                existingSet.setIsCompleted(loggedSet.getIsCompleted());
                break;
            }
        }
        workoutExerciseLogRepository.save(workoutExerciseLog);
    }
}
