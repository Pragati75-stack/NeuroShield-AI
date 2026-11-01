-- NeuroShield AI - MySQL 8+ schema
-- Run:  mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS neuroshield_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE neuroshield_db;

-- ---------------------------------------------------------------------
-- Future extension (NOT active yet): user accounts.
-- When authentication is added, create a `users` table and then run:
--   ALTER TABLE prediction_history
--     ADD CONSTRAINT fk_prediction_history_user
--     FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL;
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS prediction_history (
    id                  BIGINT          NOT NULL AUTO_INCREMENT,
    user_id             BIGINT          NULL COMMENT 'Reserved for future user accounts',
    model_name          VARCHAR(100)    NOT NULL,
    risk_score          DOUBLE          NOT NULL,
    decision_threshold  DOUBLE          NOT NULL,
    predicted_class     VARCHAR(50)     NOT NULL,
    input_data          JSON            NOT NULL,
    explanation         JSON            NULL,
    created_at          DATETIME(6)     NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    INDEX idx_prediction_history_created_at (created_at),
    INDEX idx_prediction_history_model_name (model_name),
    INDEX idx_prediction_history_user_id (user_id),
    CONSTRAINT chk_prediction_history_risk_score CHECK (risk_score >= 0 AND risk_score <= 1),
    CONSTRAINT chk_prediction_history_threshold CHECK (decision_threshold >= 0 AND decision_threshold <= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
