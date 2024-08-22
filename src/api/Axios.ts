import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_URL,
});

export const login = async (email: string, password: string) => {
	try {
		const response = await api.post('/user/login', { email, password });
		return response.data;
	} catch (error) {
		console.error('Erreur de connexion:', error);
		throw error;
	}
};

export const getUserProfile = async (token: string) => {
	try {
		const response = await api.post(
			'/user/profile',
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		console.error('Erreur lors de la récupération du profil:', error);
		throw error;
	}
};

export const fetchUserData = async (email: string, password: string) => {
	try {
		const loginData = await login(email, password);
		const token = loginData.body.token;
		const profileData = await getUserProfile(token);

		return {
			...loginData,
			firstName: profileData.body.firstName,
			lastName: profileData.body.lastName,
		};
	} catch (error) {
		console.error(
			'Erreur lors de la récupération des données utilisateur:',
			error
		);
		throw error;
	}
};
