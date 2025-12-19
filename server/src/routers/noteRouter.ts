import { Router } from 'express';
import * as NoteController from '../controllers/noteController';

// Initialize express router
const router: Router = Router();

// POST Check grammer route
router.post('/api/check', NoteController.checkGrammer);

// POST Convert Markdown to HTML route
router.post('/api/convert', NoteController.toHtml);

// Export router
export default router;
