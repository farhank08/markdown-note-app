import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import api from '../../services/api';
import './styles.css';

// Types to handle download format
type DownloadFormat = 'markdown' | 'html' | 'jsx';

const EditorPage = () => {
	const [value, setValue] = useState('# Edit here');

	// Handle file download
	const handleDownload = async (format: DownloadFormat) => {
		// Convert to format
		let content = value;
		if (format === 'html' || format === 'jsx') {
			try {
				const response = await api.post(`/convert/${format}`, {
					content,
				});
				content = response.data.payload;
			} catch (error: unknown) {
				if (error instanceof Error) console.error(error.message);
				return alert(`Download failed: Internal server error`);
			}
		}

		// Assign mime type and extension
		let mimeType: string, extension: string;
		switch (format) {
			case 'html':
				mimeType = 'text/html';
				extension = 'html';
				break;
			case 'jsx':
				mimeType = 'text/plain';
				extension = 'jsx';
				break;
			case 'markdown':
			default:
				mimeType = 'text/markdown';
				extension = 'md';
				break;
		}

		// Wrap content in binary container and mark by type
		const blob = new Blob([content], { type: mimeType });

		// Temporary URL to download blob
		const url = URL.createObjectURL(blob);

		// Download file by browser
		const a = document.createElement('a');
		a.href = url;
		a.download = `note.${extension}`;
		a.click();

		// Free memory by removing temporary blob url
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<div className="container menubar justify-center">
				<label>Download File:</label>
				<button onClick={async () => await handleDownload('html')}>HTML</button>
				<button onClick={async () => await handleDownload('jsx')}>JSX</button>
				<button onClick={async () => await handleDownload('markdown')}>Markdown</button>
			</div>
			<div className="container flex-1 p-vert-1">
				<div className="editor">
					<MDEditor
						className="editor"
						value={value}
						onChange={(value) => setValue(value ?? '')}
						height="100%"
						visibleDragbar={true}
					/>
				</div>
			</div>
		</>
	);
};

export default EditorPage;
