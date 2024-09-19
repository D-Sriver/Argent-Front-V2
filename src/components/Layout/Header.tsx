import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { clearUser } from '../../store/userSlice';

export default function Header() {
	const dispatch = useDispatch();
	const { firstName, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);

	const handleLogout = () => {
		dispatch(clearUser());
		sessionStorage.removeItem('userToken');
		localStorage.removeItem('userEmail');
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
			<div className="main-nav-item-block">
				{isAuthenticated ? (
					<>
						<Link className="main-nav-item" to="/profile">
							<i className="fa fa-user-circle"></i>
							<span>{firstName}</span>
						</Link>
						<Link className="main-nav-item" to="/" onClick={handleLogout}>
							<i className="fa fa-sign-out"></i>
							<span>Sign Out</span>
						</Link>
					</>
				) : (
					<Link className="main-nav-item" to="/Login">
						<i className="fa fa-user-circle"></i>
						<span>Login</span>
					</Link>
				)}
			</div>
		</nav>
	);
}
