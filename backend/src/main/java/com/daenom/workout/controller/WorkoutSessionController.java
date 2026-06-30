package com.daenom.workout.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.workoutSession.ActiveSessionResponse;
import com.daenom.workout.model.LoggedSet;
import com.daenom.workout.service.WorkoutSessionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/workout-sessions")
@RequiredArgsConstructor
public class WorkoutSessionController {
    private final WorkoutSessionService workoutSessionService;

    @PostMapping("/start")
    public ActiveSessionResponse startWorkoutSession(@RequestParam Long userId, @RequestParam Long programDayId) {
        return workoutSessionService.initializeSession(userId, programDayId);
    }

    @PutMapping("/end")
    public void endWorkoutSession(@RequestParam Long sessionId) {
        workoutSessionService.endWorkoutSession(sessionId);
    }

    @PutMapping("/logs/{logId}")
    public void updateWorkoutLog(@PathVariable Long logId, @RequestBody LoggedSet loggedSet) {
        workoutSessionService.updateWorkoutLog(logId, loggedSet);
    }

    
}
