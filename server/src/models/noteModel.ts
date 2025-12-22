import { parse } from 'marked';
import sanitizeHtml from 'sanitize-html';

// Convert Markdown to HTML
export const convertToHtml = async (markdown: string): Promise<string> => {
	// Parse markdown to unsanitized HTML
	const dirtyHtml: string = await parse(markdown);

	// Sanitize untrusted HTML
	const sanitized: string = sanitizeHtml(dirtyHtml);

	// Return sanitized HTML
	return sanitized;
};

// Convert Markdown to JSX
export const convertToJsx = async (markdown: string): Promise<string> => {
	// Convert to HTML
	const html = await convertToHtml(markdown);

	// Conver HTML to JSX
	const jsx = html
		.replace(/class=/g, 'className=')
		.replace(/for=/g, 'htmlFor=')
		.replace(/<br>/g, '<br />')
		.replace(/<hr>/g, '<hr />');

	// Wrap JSX
	const wrappedJsx = `
		export default function Note() {
			return (
				<>
					${jsx.split('\n').map((l) => `	 ${l}`)}
				</>
			);
		}
		`.trim();

	// Return converted JSX
	return wrappedJsx;
};
