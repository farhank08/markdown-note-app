import chalk from 'chalk';
import { Request, Response } from 'express';
import * as NoteModel from '../models/noteModel.js';

// Convert to HTML controller
export const toHtml = async (req: Request, res: Response) => {
	// Spread request body
	const { content }: { _id: string; content: string } = req.body;

	// Convert to HTML
	let html;
	try {
		html = await NoteModel.convertToHtml(content);
	} catch (error: unknown) {
		// Handle parsing error
		console.error(
			`Route request ${chalk.yellowBright(req.method)} /api${req.url} ${chalk.redBright(
				'failed'
			)} at ${new Date().toLocaleString()}: ${chalk.redBright(
				error instanceof Error ? error.message : 'Markdown parsing failed'
			)}`
		);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}

	// Handle success
	console.log(
		`Route request ${chalk.yellowBright(req.method)} /api${req.url} ${chalk.greenBright(
			'successful'
		)} at ${new Date().toLocaleString()}`
	);
	return res.status(200).json({
		success: true,
		message: 'Converted to HTML',
		payload: html,
	});
};

// Convert to JSX controller
export const toJsx = async (req: Request, res: Response) => {
	// Spread request body
	const { content }: { _id: string; content: string } = req.body;

	// Convert to JSX
	let jsx;
	try {
		jsx = await NoteModel.convertToJsx(content);
	} catch (error: unknown) {
		// Handle parsing error
		console.error(
			`Route request ${chalk.yellowBright(req.method)} /api${req.url} ${chalk.redBright(
				'failed'
			)} at ${new Date().toLocaleString()}: ${chalk.redBright(
				error instanceof Error ? error.message : 'Markdown parsing failed'
			)}`
		);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}

	// Handle success
	console.log(
		`Route request ${chalk.yellowBright(req.method)} /api${req.url} ${chalk.greenBright(
			'successful'
		)} at ${new Date().toLocaleString()}`
	);
	return res.status(200).json({
		success: true,
		message: 'Converted to JSX',
		payload: jsx,
	});
};
