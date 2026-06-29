ALTER TABLE program_day_exercise
    DROP COLUMN sets,
    DROP COLUMN min_reps,
    DROP COLUMN max_reps,
    ADD COLUMN sets JSONB NOT NULL DEFAULT '[]'::jsonb;