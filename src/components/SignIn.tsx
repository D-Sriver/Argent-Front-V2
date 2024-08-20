import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	const navigate = useNavigate();

	const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		navigate('/user');
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form>
					<div className="input-wrapper">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button
						type="button"
						className="sign-in-button"
						onClick={handleSignIn}
					>
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}
