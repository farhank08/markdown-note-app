import { Request, Response } from 'express';
import * as NoteModel from '../models/noteModel';

// TODO: Check grammer controller
export const checkGrammer = async (req: Request, res: Response): Promise<Response> => {
	// Spread request body
	const content: string = req.body.content;

	// TODO: Handle missing content
	if (!content) {
		console.error();
		return res.status(400).json({
			success: false,
			message: 'Missing markdown content',
		});
	}

	// Check grammer errors
	let issues;
	try {
		issues = await NoteModel.checkGrammer(content);
	} catch (error) {
		// TODO: Handle third-party API server error
		console.error();
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}

	// TODO: Handle success
	console.log();
	return res.status(200).json({
		success: true,
		message: 'Grammer checked',
		payload: issues,
	});
};

// TODO: Convert to HTML controller
export const toHtml = (req: Request, res: Response) => {
	// Spread request body
	const { content }: { _id: string; content: string } = req.body;

	// Convert to HTML
	const html = NoteModel.convertToHtml(content);

	// TODO: Handle success
	console.log();
	return res.status(200).json({
		success: true,
		message: 'Converted to HTML',
		payload: html,
	});
};
