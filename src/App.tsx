import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home/Home';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import TransactionList from './components/TransactionList';
import User from './components/User';

export default function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sign-in" element={<SignIn />} />
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
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}
