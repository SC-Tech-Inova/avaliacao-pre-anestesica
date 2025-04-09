import { Request, Response } from 'express';
import evaluationService from '../services/evaluationService';
import { generatePDF } from '../services/pdfService'; // Import the PDF generation function
import { preAnestheticEvaluation } from '../models/preAnestheticEvaluation'; // Corrigido o tipo para estar em PascalCase

// Criar uma nova avaliação
export const createEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const evaluationData: preAnestheticEvaluation = req.body;

    // Validações obrigatórias
    if (!evaluationData.patientName || !evaluationData.evaluationDate) {
      res.status(400).json({
        success: false,
        message: 'Os campos patientName e evaluationDate são obrigatórios.',
      });
      return;
    }

    const savedEvaluation = await evaluationService.createEvaluation(evaluationData);

    // Generate PDF after saving evaluation
    const pdfPath = generatePDF(savedEvaluation);

    res.status(201).json({
      success: true,
      message: 'Avaliação salva com sucesso!',
      evaluation: savedEvaluation,
      pdfPath, // Include the path to the generated PDF
    });
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    res.status(500).json({
      success: false,
      message: 'Não foi possível salvar a avaliação.',
    });
  }
};

// Listar avaliações por paciente
export const listEvaluationsByPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID do paciente
    const evaluations = await evaluationService.getEvaluationsByPatient(Number(id));

    if (!evaluations || evaluations.length === 0) {
      res.status(404).json({ success: false, message: 'Nenhuma avaliação encontrada para este paciente.' });
      return;
    }

    res.status(200).json({ success: true, evaluations });
  } catch (error) {
    console.error('Erro ao buscar avaliações por paciente:', error);
    res.status(500).json({ success: false, message: 'Não foi possível buscar avaliações.' });
  }
};

// Gerar PDF para uma avaliação específica
export const generateEvaluationPDF = async (req: Request, res: Response): Promise<void> => {
  try {
    const { evaluationId } = req.params; // ID da avaliação
    const evaluation = await evaluationService.getEvaluationById(Number(evaluationId));

    if (!evaluation) {
      res.status(404).json({ success: false, message: 'Avaliação não encontrada.' });
      return;
    }

    const pdfBuffer = await pdfService.generatePDF(evaluation);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=evaluation-${evaluationId}.pdf`);
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    res.status(500).json({ success: false, message: 'Não foi possível gerar o PDF.' });
  }
};

// Atualizar uma avaliação existente
export const updateEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID da avaliação
    const evaluationData: Partial<preAnestheticEvaluation> = req.body;

    const updatedEvaluation = await evaluationService.updateEvaluation(Number(id), evaluationData);

    res.status(200).json({
      success: true,
      message: 'Avaliação atualizada com sucesso!',
      evaluation: updatedEvaluation,
    });
  } catch (error) {
    console.error('Erro ao atualizar avaliação:', error);
    res.status(500).json({ success: false, message: 'Não foi possível atualizar a avaliação.' });
  }
};

// Listar avaliações por período
export const getEvaluationsByPeriod = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    const evaluations = await evaluationService.getEvaluationsByPeriod(startDate as string, endDate as string);

    res.status(200).json({
      success: true,
      evaluations,
    });
  } catch (error) {
    console.error('Erro ao buscar avaliações por período:', error);
    res.status(500).json({ success: false, message: 'Não foi possível buscar avaliações por período.' });
  }
};

// Estatísticas de avaliações
export const getEvaluationStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const statistics = await evaluationService.getEvaluationStatistics();

    res.status(200).json({
      success: true,
      statistics,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas de avaliações:', error);
    res.status(500).json({ success: false, message: 'Não foi possível buscar estatísticas de avaliações.' });
  }
};

// Deletar uma avaliação
export const deleteEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID da avaliação

    await evaluationService.deleteEvaluation(Number(id));

    res.status(200).json({
      success: true,
      message: 'Avaliação deletada com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao deletar avaliação:', error);
    res.status(500).json({ success: false, message: 'Não foi possível deletar a avaliação.' });
  }
};
