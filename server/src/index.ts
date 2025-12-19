import chalk from 'chalk';
import dotenv from 'dotenv';
import { Express } from 'express';
import http from 'http';

import { createServer } from './server';

// Load environment variables
dotenv.config();

// Server port
const port = process.env.PORT || 3000;

// Express server instance
const app: Express = createServer();

// Start listening on port
const server: http.Server = app.listen(port, () => {
	console.log(`\nServer listening on port ${chalk.yellowBright(port)}\n`);
});

// Application shutdown callback
const shutdown = () => {
	// Shut down server gracefully
	if (server) {
		server.close(async (error: unknown) => {
			// Handle server shutdown error
			if (error) {
				// Exit with failed
				console.error(
					`Port:${chalk.yellowBright(port)} server shutdown error: ${chalk.redBright(
						error instanceof Error ? error.message : 'Unhandled error'
					)}`
				);
				process.exit(1);
			}

			// Exit with success
			console.log(
				`Port:${chalk.yellowBright(port)} server shutdown ${chalk.greenBright('successful')}`
			);
			process.exit(0);
		});
	}
};

// Apply shutdown callback to exit codes
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
