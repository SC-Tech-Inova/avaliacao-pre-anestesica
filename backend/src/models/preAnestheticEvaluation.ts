export interface preAnestheticEvaluation {
  id?: number;
  patientId: number;
  anesthesiologistId?: string;
  evaluationDate: Date;
  physicalState?: string;
  height?: number;
  weight?: number;
  bloodPressure?: string;
  heartRate?: number;
  mallampati?: string;
  surgeryType?: string;
  anesthesiaType?: string;
  allergies: string[];
  patientName?: string; // Added patientName property
  comorbidities: string[];
  previousSurgeries: string[];
  medications: string[];
  observations?: string;
  createdAt?: Date;
}