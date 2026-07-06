ALTER TABLE exercise
    DROP COLUMN instructions;

ALTER TABLE exercise
    ADD COLUMN slug VARCHAR(255),
    ADD COLUMN image_url VARCHAR(255),
    ADD COLUMN primary_muscle_group VARCHAR(50),
    ADD COLUMN equipment VARCHAR(50),
    ADD COLUMN focus VARCHAR(50),
    ADD COLUMN difficulty VARCHAR(50),
    ADD COLUMN steps JSONB,
    ADD COLUMN cues JSONB;