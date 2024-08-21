export const validateEmail = (email: string): string => {
	if (!email) {
		return "L'email est requis";
	}
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailRegex.test(email)) {
		return "L'email n'est pas valide";
	}
	return '';
};

export const validatePassword = (password: string): string => {
	if (!password) {
		return 'Le mot de passe est requis';
	}
	if (password.length < 6) {
		return 'Le mot de passe doit contenir au moins 6 caractères';
	}
	return '';
};
