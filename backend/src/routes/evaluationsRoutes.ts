import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/requireRole';
import {
  getEvaluationById,
  generatePDF,
  createEvaluation,
  updateEvaluation,
  getEvaluationsByPeriod,
  getEvaluationStatistics,
  deleteEvaluation,
} from '../controllers/evaluationsController';

const router = Router();

// Rota para adicionar avaliação (protegida)
router.post('/', authMiddleware, requireRole(['anesthesiologist', 'admin']), createEvaluation);

// Rota para buscar uma avaliação por ID
router.get('/:id', authMiddleware, getEvaluationById);

// Rota para gerar PDF de uma avaliação
router.get('/:id/pdf', authMiddleware, generatePDF);

// Rota para atualizar uma avaliação
router.put('/:id', authMiddleware, requireRole(['anesthesiologist', 'admin']), updateEvaluation);

// Rota para buscar avaliações por período (admin)
router.get('/period', authMiddleware, requireRole(['admin']), getEvaluationsByPeriod);

// Rota para estatísticas de avaliações (admin)
router.get('/statistics', authMiddleware, requireRole(['admin']), getEvaluationStatistics);

// Rota para deletar uma avaliação (admin)
router.delete('/:id', authMiddleware, requireRole(['admin']), deleteEvaluation);

export default router;