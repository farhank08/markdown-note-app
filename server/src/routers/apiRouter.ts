import { Router } from 'express';
import * as NoteController from '../controllers/noteController.js';

// Initialize express router
const router: Router = Router();

// POST Convert Markdown to HTML route
router.post('/convert/html', NoteController.toHtml);

// POST Convert Markdown to JSX route
router.post('/convert/jsx', NoteController.toJsx);

// Export router
export default router;
