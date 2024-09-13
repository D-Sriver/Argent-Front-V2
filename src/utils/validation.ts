export const validateEmail = (email: string): string => {
	if (!email) {
		return 'Email is required';
	}
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (!emailRegex.test(email)) {
		return 'Email is not valid';
	}
	return '';
};

export const validatePassword = (password: string): string => {
	if (!password) {
		return 'Password is required';
	}
	if (password.length < 6) {
		return 'Password must contain at least 6 characters';
	}
	return '';
};
