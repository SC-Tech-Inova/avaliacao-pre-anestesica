import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { NextApiRequest, NextApiResponse } from 'next';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  medical_record: string;
  surgery_type?: string;
  evaluation_status: 'PENDING' | 'APPROVED' | 'NOT_APPROVED';
  evaluation_date?: string;
  created_at: string;
}

export interface PreAnestheticEvaluation {
  patientId: string;
  observations: string;
  startTime?: Date;
}

/* 
 * Função para obter todos os pacientes usando axios.
 * A rota chamada é `${API_BASE_URL}/api/patients`.
 */
export const getPatients = async (): Promise<Patient[]> => {
  try {
    const response = await axios.get<Patient[]>(`${API_BASE_URL}/api/patients`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

/* 
 * Função para buscar um paciente por ID.
 */
export async function getPatientById(patientId: string): Promise<Patient> {
  try {
    const response = await axios.get<Patient>(`${API_BASE_URL}/api/patients/${patientId}`, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient by ID:', error);
    throw error;
  }
};

/* 
 * Função para salvar uma avaliação pré-anestésica usando axios.
 */
export async function savePreAnestheticEvaluation(evaluationData: PreAnestheticEvaluation): Promise<{ message: string }> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/patients`, evaluationData, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving evaluation:', error);
    throw error;
  }
};

/* 
 * Função alternativa para buscar pacientes usando fetch.
 */
export async function fetchPatients(): Promise<Patient[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/patients`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching patients with fetch:', error);
    throw error;
  }
}

/* 
 * Função alternativa para salvar avaliação usando fetch.
 */
export async function saveEvaluation(evaluationData: PreAnestheticEvaluation): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/patients`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaluationData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error saving evaluation with fetch:', error);
    throw error;
  }
};

/* 
 * Handler para oferecer suporte a requisições Next.js API 
 * (caso você queira executar essa lógica também como um API Route do Next.js).
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const patients = await fetchPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Failed to fetch patients' });
    }
  } else if (req.method === 'POST') {
    try {
      const evaluationData = req.body;
      const evaluationDataWithStartTime = {
        ...evaluationData,
        startTime: new Date(),
      };
      await savePreAnestheticEvaluation(evaluationDataWithStartTime);
      res.status(201).json({ message: 'Evaluation saved successfully' });
    } catch (error) {
      console.error('Error saving evaluation:', error);
      res.status(500).json({ error: 'Failed to save evaluation' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
