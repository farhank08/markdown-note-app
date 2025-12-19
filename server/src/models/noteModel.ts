import axios, { AxiosResponse } from 'axios';
import markdownToTxt from 'markdown-to-txt';
import { parse } from 'marked';
import sanitizeHtml from 'sanitize-html';

// Check grammer via third-party API
export const checkGrammer = async <T>(markdown: string): Promise<T> => {
	// Parse markdown to unsanitized HTML
	const dirtyHtml: string = await parse(markdown);

	// Sanitize untrusted HTML
	const sanitized: string = sanitizeHtml(dirtyHtml);

	// Remove HTML tags to get plain text
	const text: string = sanitized.replace(/<[^>]*>/g, '');

	// Check grammer via LanguageTool API
	const url = 'https://api.languagetool.org/v2/check';
	const response: AxiosResponse = await axios.post(url, null, {
		params: {
			text,
			language: 'auto',
		},
	});

	// Return grammer errors
	return response.data.matches;
};

// Convert Markdown to HTML
export const convertToHtml = async (markdown: string): Promise<string> => {
	// Parse markdown to unsanitized HTML
	const dirtyHtml: string = await parse(markdown);

	// Sanitize untrusted HTML
	const sanitized: string = sanitizeHtml(dirtyHtml);

	// Return sanitized HTML
	return sanitized;
};
