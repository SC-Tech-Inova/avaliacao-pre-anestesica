import { Request, Response } from 'express';
import db from '../../removidos/database'; // Adjusted the path to point to the correct location of the database file
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export default pool;

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const {
      patient_id,
      hypertension,
      diabetes,
      heart_disease,
      stroke,
      alzheimer,
      parkinson,
      seizure,
      motor_deficit,
      current_medications,
      hb,
      ht,
      platelets,
      tp,
      ttpa,
      rni,
      blood_sugar,
      urea,
      creatinine,
      sodium,
      potassium,
      ecg,
      ecg_details,
      chest_xray,
      chest_xray_details,
      additional_tests,
      additional_tests_details,
      specialist_evaluation,
      specialist_evaluation_details,
      acv,
      ar,
      blood_pressure,
      heart_rate,
      weight,
      height,
      mallampati,
      functional_capacity,
      dental_prosthesis,
      asa_classification,
      proposed_anesthesia,
      fasting_instructions,
      fasting_solids,
      fasting_liquids,
      blood_transfusion_consent,
      consent_details,
    } = req.body;

    const result = await db.query(
      `INSERT INTO pre_anesthetic_evaluations (
        patient_id, hypertension, diabetes, heart_disease, 
        stroke, alzheimer, parkinson, seizure, motor_deficit,
        current_medications, hb, ht, platelets, tp, ttpa, rni, 
        blood_sugar, urea, creatinine, sodium, potassium, ecg, ecg_details,
        chest_xray, chest_xray_details, additional_tests, additional_tests_details,
        specialist_evaluation, specialist_evaluation_details, acv, ar, blood_pressure,
        heart_rate, weight, height, mallampati, functional_capacity, dental_prosthesis,
        asa_classification, proposed_anesthesia, fasting_instructions, fasting_solids,
        fasting_liquids, blood_transfusion_consent, consent_details, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, NOW()) RETURNING *`,
      [
        patient_id,
        hypertension,
        diabetes,
        heart_disease,
        stroke,
        alzheimer,
        parkinson,
        seizure,
        motor_deficit,
        current_medications,
        hb,
        ht,
        platelets,
        tp,
        ttpa,
        rni,
        blood_sugar,
        urea,
        creatinine,
        sodium,
        potassium,
        ecg,
        ecg_details,
        chest_xray,
        chest_xray_details,
        additional_tests,
        additional_tests_details,
        specialist_evaluation,
        specialist_evaluation_details,
        acv,
        ar,
        blood_pressure,
        heart_rate,
        weight,
        height,
        mallampati,
        functional_capacity,
        dental_prosthesis,
        asa_classification,
        proposed_anesthesia,
        fasting_instructions,
        fasting_solids,
        fasting_liquids,
        blood_transfusion_consent,
        consent_details,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar avaliação pré-anestésica' });
  }
};