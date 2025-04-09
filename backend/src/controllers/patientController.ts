import { Request, Response } from 'express';
import { patientSchema } from '../validators/patientValidator'; // Importa o esquema atualizado
import patientService from '../services/patientService';

class PatientController {
  // Listar todos os pacientes
  async listPatients(req: Request, res: Response): Promise<void> {
    try {
      console.log('Iniciando busca por pacientes...');
      const patients = await patientService.findAll();
      console.log('Pacientes encontrados:', patients);
      res.status(200).json({ success: true, patients });
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      res.status(500).json({ success: false, message: 'Erro ao listar pacientes.' });
    }
  }

  // Criar um paciente
  async createPatient(req: Request, res: Response): Promise<void> {
    try {
      const { error } = patientSchema.validate(req.body); // Validação com o esquema atualizado
      if (error) {
        res.status(400).json({ success: false, message: `Erro de validação: ${error.details[0].message}` });
        return;
      }

      const patientData = req.body;
      const patient = await patientService.create(patientData);
      res.status(201).json({ success: true, patient });
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      res.status(500).json({ success: false, message: 'Erro ao criar paciente.' });
    }
  }

  // Atualizar um paciente
  async updatePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar se o paciente existe
      const existingPatient = await patientService.findById(id);
      if (!existingPatient) {
        res.status(404).json({ success: false, message: 'Paciente não encontrado.' });
        return;
      }

      const { error } = patientSchema.validate(req.body); // Validação com o esquema atualizado
      if (error) {
        res.status(400).json({ success: false, message: `Erro de validação: ${error.details[0].message}` });
        return;
      }

      const patientData = req.body;
      const updatedPatient = await patientService.update(id, patientData);
      res.status(200).json({ success: true, patient: updatedPatient });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      res.status(500).json({ success: false, message: 'Erro ao atualizar paciente.' });
    }
  }

  // Excluir um paciente
  async deletePatient(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Verificar se o paciente existe
      const existingPatient = await patientService.findById(id);
      if (!existingPatient) {
        res.status(404).json({ success: false, message: 'Paciente não encontrado.' });
        return;
      }

      await patientService.delete(id);
      res.status(200).json({ success: true, message: 'Paciente excluído com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      res.status(500).json({ success: false, message: 'Erro ao excluir paciente.' });
    }
  }
}

export default new PatientController();
