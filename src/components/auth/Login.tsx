import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../api/Axios';
import { setUser } from '../../store/userSlice';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {
		const userToken = sessionStorage.getItem('userToken');
		if (userToken) {
			return navigate('/profile');
		}
		const savedEmail = localStorage.getItem('userEmail');
		if (savedEmail) {
			setEmail(savedEmail);
			setRememberMe(true);
		}
	}, []);

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const emailError = validateEmail(email);
		const passwordError = validatePassword(password);

		setEmailError(emailError);
		setPasswordError(passwordError);

		if (!emailError && !passwordError) {
			try {
				const userData = await fetchUserData(email, password);
				dispatch(
					setUser({
						firstName: userData.firstName,
						lastName: userData.lastName,
						email: userData.email,
					})
				);
				sessionStorage.setItem('userToken', userData.body.token);
				if (rememberMe) {
					localStorage.setItem('userEmail', email);
				} else {
					localStorage.removeItem('userEmail');
				}
				navigate('/profile');
			} catch (error) {
				console.error('Login error:', error);
				setEmailError('Incorrect email or password');
				setPasswordError('Incorrect email or password');
			}
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon">
					<FontAwesomeIcon icon={faUserCircle} />
				</i>
				<h1>Login</h1>
				<form onSubmit={handleSignIn}>
					<div className="input-wrapper">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							autoComplete="username"
							aria-label="Email address"
							aria-required="true"
						/>
						{emailError && <p className="error-message">{emailError}</p>}
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="current-password"
						/>
						{passwordError && <p className="error-message">{passwordError}</p>}
					</div>
					<div className="input-remember">
						<input
							type="checkbox"
							id="remember-me"
							checked={rememberMe}
							onChange={(e) => setRememberMe(e.target.checked)}
						/>
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button type="submit" className="sign-in-button">
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}
