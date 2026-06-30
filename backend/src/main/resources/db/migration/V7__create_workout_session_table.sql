CREATE TABLE workout_session
(
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    program_id BIGINT NOT NULL REFERENCES program(id),
    program_day_id BIGINT NOT NULL REFERENCES program_day(id),
    status VARCHAR(100),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);