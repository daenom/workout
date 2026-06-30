package com.daenom.workout.service;

import com.daenom.workout.dto.workoutSession.ActiveSessionResponse;
import com.daenom.workout.model.LoggedSet;

public interface WorkoutSessionService {
    ActiveSessionResponse initializeSession(Long userId, Long programDayId);

    void endWorkoutSession(Long sessionId);
    
    void updateWorkoutLog(Long logId, LoggedSet loggedSet);
}
