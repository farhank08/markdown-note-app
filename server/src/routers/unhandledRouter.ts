import chalk from 'chalk';
import { Router, Request, Response } from 'express';

// Initialize express router
const router: Router = Router();

router.use((req: Request, res: Response) => {
	// Handle unhandled route error
	console.error(
		`Route request ${chalk.yellowBright(req.method)} ${req.path} ${chalk.red(
			'failed'
		)} at ${new Date().toLocaleString()}: ${chalk.red('Unhandled')}`
	);
	return res.status(404).json({
		success: false,
		message: 'Unhandled route',
	});
});

// Export router
export default router;
