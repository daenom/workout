CREATE TABLE program_day (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100),
    program_id BIGINT NOT NULL,
    description TEXT,
    program_day_type VARCHAR(100),
    order_index INT,

    CONSTRAINT fk_program_day_program
        FOREIGN KEY (program_id)
        REFERENCES program(id)
        ON DELETE CASCADE
);