import axios from 'axios';

// Single axios client instance
const api = axios.create({
	baseURL: '/api',
	withCredentials: true,
	timeout: 10000,
});

// Export client
export default api;
