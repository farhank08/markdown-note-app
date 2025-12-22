import cors from 'cors';
import express, { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiRouter from './routers/apiRouter.js';
import UnhandledRouter from './routers/unhandledRouter.js';
import ViewRouter from './routers/viewRouter.js';

// Resolve path names for ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistDir = path.resolve(__dirname, '../../client/dist');

export const createServer = (): Express => {
	// Initialize server
	const app = express();

	// Implement CORS for client-server interaction
	app.use(cors());

	// Parse JSON responses
	app.use(express.json());

	// Send static files
	app.use(express.static(clientDistDir));

	// API route handler
	app.use('/api', ApiRouter);

	// View route handler
	app.use(ViewRouter);

	// Unhandled routes handler
	app.use(UnhandledRouter);

	// Return new server instance
	return app;
};
