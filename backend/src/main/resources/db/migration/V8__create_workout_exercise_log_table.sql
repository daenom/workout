CREATE TABLE workout_exercise_log
(
    id BIGSERIAL PRIMARY KEY,
    workout_session_id BIGINT NOT NULL REFERENCES workout_session(id),
    exercise_id BIGINT NOT NULL REFERENCES exercise(id),
    order_index INT NOT NULL,
    logged_sets JSONB NOT NULL DEFAULT '[]'::jsonb
);