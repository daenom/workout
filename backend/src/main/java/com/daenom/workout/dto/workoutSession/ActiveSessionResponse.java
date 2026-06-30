package com.daenom.workout.dto.workoutSession;

import java.util.List;

import com.daenom.workout.entity.WorkoutExerciseLog;
import com.daenom.workout.entity.WorkoutSession;

public record ActiveSessionResponse(
    WorkoutSession session,
    List<WorkoutExerciseLog> exerciseLogs
) {

}