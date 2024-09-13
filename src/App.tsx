import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignIn from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import NotFound from './components/NotFound';
import SwaggerUIComponent from './components/SwaggerUI';
import TransactionList from './components/Transaction/TransactionList';
import User from './components/User';

export default function App() {
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
