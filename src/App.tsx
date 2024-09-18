import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getUserProfile } from './api/Axios';
import SignIn from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import NotFound from './components/NotFound';
import SwaggerUIComponent from './components/SwaggerUI';
import TransactionList from './components/Transaction/TransactionList';
import User from './components/User';
import { setUser } from './store/userSlice';

export default function App() {
	const dispatch = useDispatch();
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

	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/Login" element={<SignIn />} />
						<Route
							path="/profile"
							element={
								<ProtectedRoute>
									<User />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/transactions"
							element={
								<ProtectedRoute>
									<TransactionList />
								</ProtectedRoute>
							}
						/>
						<Route path="/doc-api" element={<SwaggerUIComponent />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}
