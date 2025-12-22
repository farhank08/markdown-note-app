import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EditorPage from './pages/EditorPage';
import './App.css'

const App = () => {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route
						path="/"
						element={<EditorPage />}
					/>
					{/* TODO: Add more routes */}
				</Route>
			</Routes>
		</>
	);
};

export default App;
