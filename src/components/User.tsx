import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../api/Axios';
import { accounts } from '../mock/mockUser';
import { Account } from '../types/User.types';
import { RootState } from '../store/store';
import { setUser, updateUserName } from '../store/userSlice';

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
		if (storedEmail && storedPassword && !isAuthenticated) {
			fetchUserData(storedEmail, storedPassword).then((userData) => {
				dispatch(
					setUser({
						firstName: userData.firstName,
						lastName: userData.lastName,
						email: userData.email,
					})
				);
			});
		}
	}, [dispatch, isAuthenticated]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedFirstName(firstName);
		setEditedLastName(lastName);
	};

	const handleSave = () => {
		dispatch(
			updateUserName({ firstName: editedFirstName, lastName: editedLastName })
		);
		setIsEditing(false);
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
