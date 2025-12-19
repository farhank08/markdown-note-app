import chalk from 'chalk';
import { Request, Response } from 'express';
import * as NoteModel from '../models/noteModel';

// Check grammer controller
export const checkGrammer = async (req: Request, res: Response): Promise<Response> => {
	// Spread request body
	const content: string = req.body.content;

	// Handle missing content
	if (!content) {
		console.error(
			`Route request ${chalk.yellowBright(req.method)} ${req.url} ${chalk.redBright(
				'failed'
			)} at ${new Date().toLocaleString()}: ${chalk.red('Missing markdown content')}`
		);
		return res.status(400).json({
			success: false,
			message: 'Missing markdown content',
		});
	}

	// Check grammer errors
	let issues;
	try {
		issues = await NoteModel.checkGrammer(content);
	} catch (error: unknown) {
		// Handle third-party API error
		console.error(
			`Route request ${chalk.yellowBright(req.method)} ${req.url} ${chalk.redBright(
				'failed'
			)} at ${new Date().toLocaleString()}: ${chalk.redBright(
				error instanceof Error ? error.message : 'LanguageTool API error'
			)}`
		);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}

	// Handle success
	console.log(
		`Route request ${chalk.yellowBright(req.method)} ${req.url} ${chalk.greenBright(
			'successful'
		)} at ${new Date().toLocaleString()}`
	);
	return res.status(200).json({
		success: true,
		message: 'Grammer checked',
		payload: issues,
	});
};

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
			`Route request ${chalk.yellowBright(req.method)} ${req.url} ${chalk.redBright(
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
		`Route request ${chalk.yellowBright(req.method)} ${req.url} ${chalk.greenBright(
			'successful'
		)} at ${new Date().toLocaleString()}`
	);
	return res.status(200).json({
		success: true,
		message: 'Converted to HTML',
		payload: html,
	});
};
