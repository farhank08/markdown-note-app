import { Router } from 'express';
import * as NoteController from '../controllers/noteController';

// Initialize express router
const router: Router = Router();

// POST Check grammer route
router.post('/check', NoteController.checkGrammer);

// POST Convert Markdown to HTML route
router.post('/convert', NoteController.toHtml);

// Export router
export default router;
