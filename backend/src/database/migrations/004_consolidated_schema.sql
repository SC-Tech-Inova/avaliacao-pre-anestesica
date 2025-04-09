-- Set client messages to warnings only
SET client_min_messages TO WARNING;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(200),
    role VARCHAR(50) DEFAULT 'anesthesiologist',
    crm VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table (merged evaluations into this)
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    medical_record VARCHAR(50) UNIQUE,
    proposed_surgery VARCHAR(255),
    previous_surgeries TEXT,
    complications TEXT,
    family_anesthetic_complications TEXT,
    medication_allergies TEXT,
    hypertension BOOLEAN,
    heart_failure BOOLEAN,
    myocardial_infarction BOOLEAN,
    arrhythmia BOOLEAN,
    diabetes BOOLEAN,
    hypothyroidism BOOLEAN,
    hyperthyroidism BOOLEAN,
    asthma BOOLEAN,
    bronchitis BOOLEAN,
    stroke BOOLEAN,
    alzheimer BOOLEAN,
    parkinson BOOLEAN,
    seizure BOOLEAN,
    motor_deficit BOOLEAN,
    current_medications TEXT,
    hb NUMERIC(5,2),
    ht NUMERIC(5,2),
    blood_sugar NUMERIC(5,2),
    urea NUMERIC(5,2),
    creatinine NUMERIC(5,2),
    tp NUMERIC(5,2),
    ttpa NUMERIC(5,2),
    rni NUMERIC(5,2),
    platelets NUMERIC(5,2),
    sodium NUMERIC(5,2),
    potassium NUMERIC(5,2),
    acv NUMERIC(5,2),
    ar NUMERIC(5,2),
    blood_pressure VARCHAR(50),
    heart_rate VARCHAR(50),
    weight NUMERIC(5,2),
    height NUMERIC(5,2),
    mallampati CHAR(1) CHECK (mallampati IN ('1', '2', '3', '4')),
    functional_capacity VARCHAR(50),
    dental_prosthesis BOOLEAN,
    asa_classification VARCHAR(50),
    ecg TEXT,
    chest_xray TEXT,
    additional_tests TEXT,
    specialist_evaluation TEXT,
    fasting_solids BOOLEAN,
    fasting_liquids BOOLEAN,
    blood_transfusion_consent BOOLEAN,
    proposed_anesthesia VARCHAR(255),
    released BOOLEAN,
    doctor_signature VARCHAR(255),
    digital_signature VARCHAR(255),
    evaluation_date DATE NOT NULL,
    physical_state VARCHAR(50) CHECK (physical_state IN ('ASA I', 'ASA II', 'ASA III', 'ASA IV', 'ASA V', 'ASA VI')),
    surgery_type VARCHAR(100),
    anesthesia_type VARCHAR(100),
    allergies TEXT[],
    comorbidities TEXT[],
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_patients_medical_record ON patients(medical_record);

-- Insert test users
INSERT INTO users (username, password_hash, name, role) 
VALUES (
    'admin',
    '$2b$10$5QFB6d0BQz8KMbGN5.BOx.zpVVqvzUB.nQwP3oGIU9C9PZATQhzVe', -- Password: 123456
    'Administrador',
    'admin'
);

INSERT INTO users (username, password_hash, name, role, crm) 
VALUES 
    (
        'bruno.torres',
        '$2a$14$IPb92ijLH1B5mt3YEKc52OV3j86bpDWoRyMqpTpKIHvHnqSp6IF6K', -- Password: Botelho1
        'Bruno Torres',
        'anesthesiologist',
        'CRM/BA 26610'
    ),
    (
        'alessandra.fonseca',
        '$2a$14$zIaUZts1D20ubstwSfFX3uuz97i8SNhQ4vG6b/gD/O9ovJqYTdrZi', -- Password: Botelho1
        'Alessandra Fonseca',
        'anesthesiologist',
        'CRM/BA 26609'
    );
