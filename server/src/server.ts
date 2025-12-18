import cors from 'cors';
import express, { Express } from 'express';
import unhandledRoutesHandler from './routers/unhandledRouter';

export const createServer = (): Express => {
	// Initialize server
	const app = express();

	// Implement CORS for client-server interaction
	app.use(cors());

	// Parse JSON responses
	app.use(express.json());

	// TODO: Route handlers

	// Unhandled routes handler
	app.use(unhandledRoutesHandler);

	// Return new server instance
	return app;
};
