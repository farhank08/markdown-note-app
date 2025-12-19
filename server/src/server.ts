import cors from 'cors';
import express, { Express } from 'express';
import NoteRouter from './routers/noteRouter';
import UnhandledRouter from './routers/unhandledRouter';

export const createServer = (): Express => {
	// Initialize server
	const app = express();

	// Implement CORS for client-server interaction
	app.use(cors());

	// Parse JSON responses
	app.use(express.json());

	// API Route handler
	app.use('/api', NoteRouter);

	// Unhandled routes handler
	app.use(UnhandledRouter);

	// Return new server instance
	return app;
};
