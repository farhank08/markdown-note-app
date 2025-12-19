import axios, { AxiosResponse } from 'axios';
import markdownToTxt from 'markdown-to-txt';
import { parse } from 'marked';
import sanitizeHtml from 'sanitize-html';

// TODO: Check grammer via third-party API
export const checkGrammer = async (markdown: string) => {
	// Parse markdown to unsanitized text
	const dirtyText: string = markdownToTxt(markdown);

	// Sanitize untrusted text
	const sanitized: string = sanitizeHtml(dirtyText);

	// Check grammer via LanguageTool API
	const url = 'https://api.languagetool.org/v2/check';
	const response: AxiosResponse = await axios.post(url, {
		text: sanitized,
		language: 'auto',
	});

	// Return grammer errors
	return response.data.matches;
};

// Convert Markdown to HTML
export const convertToHtml = async (markdown: string) => {
	// Parse markdown to unsanitized HTML
	const dirtyHtml: string = await parse(markdown);

	// Sanitize untrusted HTML
	const sanitized: string = sanitizeHtml(dirtyHtml);

	// Return sanitized HTML
	return sanitized;
};
