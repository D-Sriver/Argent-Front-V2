import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../api/Axios';

export default function SignIn() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await fetchUserData(email, password);
			localStorage.setItem('userEmail', email);
			localStorage.setItem('userPassword', password);
			navigate('/user');
		} catch (error) {
			console.error('Erreur de connexion:', error);
			// Ici, vous pourriez afficher un message d'erreur à l'utilisateur
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSignIn}>
					<div className="input-wrapper">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
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
