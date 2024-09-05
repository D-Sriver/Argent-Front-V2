import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { clearUser } from '../../store/userSlice';

export default function Header() {
	const dispatch = useDispatch();
	const { firstName, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		dispatch(clearUser());
		localStorage.removeItem('userEmail');
		localStorage.removeItem('userPassword');
		localStorage.removeItem('userFirstName');
		localStorage.removeItem('userLastName');
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img
					className="main-nav-logo-image"
					src="/img/argentBankLogo.png"
					alt="Argent Bank Logo"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			<div className="burger-menu" onClick={toggleMenu}>
				<i className="fas fa-bars"></i>
			</div>
			<div className={`main-nav-item-block ${isMenuOpen ? 'open' : ''}`}>
				{isAuthenticated ? (
					<>
						<Link
							className="main-nav-item"
							to="/profile"
							onClick={() => setIsMenuOpen(false)}
						>
							<i className="fa fa-user-circle"></i>
							{firstName}
						</Link>
						<Link className="main-nav-item" to="/" onClick={handleLogout}>
							<i className="fa fa-sign-out"></i>
							Se déconnecter
						</Link>
					</>
				) : (
					<Link
						className="main-nav-item"
						to="/sign-in"
						onClick={() => setIsMenuOpen(false)}
					>
						<i className="fa fa-user-circle"></i>
						Se connecter
					</Link>
				)}
			</div>
		</nav>
	);
}
