import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface ProtectedRouteProps {
	children: React.ReactNode;
}
// crée un composant pour protéger les routes qui ne sont accessibles que si l'utilisateur est authentifié
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	if (!isAuthenticated) {
		// si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
		return <Navigate to="/Login" replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
