import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserData, login, updateUserProfile } from '../api/Axios';
import { accounts } from '../mock/mockUser';
import { RootState } from '../store/store';
import { setUser } from '../store/userSlice';
import { Account } from '../types/User.types';

export default function User() {
	const dispatch = useDispatch();
	const { firstName, lastName, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);
	const [isEditing, setIsEditing] = useState(false);
	const [editedFirstName, setEditedFirstName] = useState(firstName);
	const [editedLastName, setEditedLastName] = useState(lastName);

	useEffect(() => {
		const storedEmail = localStorage.getItem('userEmail');
		const storedPassword = localStorage.getItem('userPassword');
		const storedFirstName = localStorage.getItem('userFirstName');
		const storedLastName = localStorage.getItem('userLastName');

		if (storedEmail && storedPassword && !isAuthenticated) {
			if (storedFirstName && storedLastName) {
				dispatch(
					setUser({
						firstName: storedFirstName,
						lastName: storedLastName,
						email: storedEmail,
					})
				);
			} else {
				fetchUserData(storedEmail, storedPassword).then((userData) => {
					dispatch(
						setUser({
							firstName: userData.firstName,
							lastName: userData.lastName,
							email: userData.email,
						})
					);
					localStorage.setItem('userFirstName', userData.firstName);
					localStorage.setItem('userLastName', userData.lastName);
				});
			}
		}
	}, [dispatch, isAuthenticated]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedFirstName(firstName);
		setEditedLastName(lastName);
	};

	const handleSave = async () => {
		try {
			const storedEmail = localStorage.getItem('userEmail');
			const storedPassword = localStorage.getItem('userPassword');

			if (!storedEmail || !storedPassword) {
				throw new Error('Missing authentication information');
			}

			// Get a new token
			const loginData = await login(storedEmail, storedPassword);
			const token = loginData.body.token;

			// Update user profile on the server
			await updateUserProfile(token, editedFirstName, editedLastName);

			// Update Redux state and localStorage
			dispatch(
				setUser({
					firstName: editedFirstName,
					lastName: editedLastName,
					email: storedEmail,
				})
			);
			localStorage.setItem('userFirstName', editedFirstName);
			localStorage.setItem('userLastName', editedLastName);

			console.log('User data updated successfully');
			setIsEditing(false);
		} catch (error) {
			console.error('Error updating user data:', error);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	return (
		<>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						{isEditing ? (
							<form
								className="edit-form"
								onSubmit={(e) => {
									e.preventDefault();
									handleSave();
								}}
							>
								<div className="edit-form-inputs">
									<input
										type="text"
										value={editedFirstName}
										onChange={(e) => setEditedFirstName(e.target.value)}
									/>
									<input
										type="text"
										value={editedLastName}
										onChange={(e) => setEditedLastName(e.target.value)}
									/>
								</div>
								<div className="edit-form-buttons">
									<button type="submit">Save</button>
									<button type="button" onClick={handleCancel}>
										Cancel
									</button>
								</div>
							</form>
						) : (
							<>
								{firstName} {lastName}
								<button className="edit-button" onClick={handleEdit}>
									<i className="fa fa-pencil"></i>
								</button>
							</>
						)}
					</h1>
					<h2 className="sr-only">Accounts</h2>
					{accounts.map((account: Account, index: number) => (
						<section className="account" key={index}>
							<div className="account-content-wrapper">
								<h3 className="account-title">{account.title}</h3>
								<p className="account-amount">${account.amount.toFixed(2)}</p>
								<p className="account-amount-description">
									{account.description}
								</p>
							</div>
							<div className="account-content-wrapper cta">
								<Link to="/transactions" className="transaction-button">
									View transactions
								</Link>
							</div>
						</section>
					))}
				</div>
			</main>
		</>
	);
}
