import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve path names for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDir = path.resolve(__dirname, '../../../client/dist');

// Initialize express router
const router: Router = Router();

// GET views
router.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.sendFile(path.join(clientDir, 'index.html'), (error: Error) => {
		if (error) return next(error);
	});
});

// Export router
export default router;
