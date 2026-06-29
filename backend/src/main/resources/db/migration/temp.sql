CREATE TABLE program_day_exercise (
    id BIGSERIAL PRIMARY KEY,
    program_day_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    order_index INT,
    sets INT,
    min_reps INT[],
    max_reps INT[],

    CONSTRAINT fk_program_day_exercise_program_day
        FOREIGN KEY (program_day_id)
        REFERENCES program_day(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_program_day_exercise_exercise
        FOREIGN KEY (exercise_id)
        REFERENCES exercise(id)
        ON DELETE CASCADE
);