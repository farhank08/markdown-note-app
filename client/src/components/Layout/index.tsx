import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import './styles.css';

const Layout = () => {
	return (
		<div className="layout">
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
