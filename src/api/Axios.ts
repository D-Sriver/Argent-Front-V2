import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserData = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${API_URL}/user/login`, {
			email,
			password,
		});
		console.log('Réponse:', response.data);
		return response.data;
	} catch (error) {
		console.error('Erreur:', error);
		throw error;
	}
};
