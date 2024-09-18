import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUserProfile } from '../../api/Axios';
import { RootState } from '../../store/store';
import { setUser } from '../../store/userSlice';

interface ProtectedRouteProps {
	children: React.ReactNode;
}

// crée un composant pour protéger les routes qui ne sont accessibles que si l'utilisateur est authentifié
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			const token = sessionStorage.getItem('userToken');
			if (token) {
				try {
					const userData = await getUserProfile(token);
					dispatch(
						setUser({
							firstName: userData.body.firstName,
							lastName: userData.body.lastName,
							email: userData.body.email,
						})
					);
				} catch (error) {
					console.error('Error verifying token:', error);
					sessionStorage.removeItem('userToken');
				}
			}
			setIsLoading(false);
		};

		checkAuth();
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
