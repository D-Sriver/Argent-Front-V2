import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserData } from '../api/Axios';
import { accounts } from '../mock/mockUser';
import { Account } from '../types/User.types';

export default function User() {
	const [firstName, setFirstName] = useState('Tony');
	const [lastName, setLastName] = useState('Stark');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const storedEmail = localStorage.getItem('userEmail');
		const storedPassword = localStorage.getItem('userPassword');
		if (storedEmail && storedPassword) {
			fetchUserData(storedEmail, storedPassword);
		}
	}, []);

	return (
		<>
			<main className="main bg-dark">
				<div className="header">
					<h1>
						Welcome back
						<br />
						{firstName} {lastName}
						{!isEditing && (
							<button
								className="edit-button"
								onClick={() => setIsEditing(true)}
							>
								<i className="fa fa-pencil"></i>
							</button>
						)}
					</h1>
					{isEditing && (
						<form
							className="edit-form"
							onSubmit={(e) => {
								e.preventDefault();
								setIsEditing(false);
							}}
						>
							<div className="edit-form-inputs">
								<input
									type="text"
									placeholder="Prénom"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
								/>
								<input
									type="text"
									placeholder="Nom"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className="edit-form-buttons">
								<button type="submit">Save</button>
								<button type="button" onClick={() => setIsEditing(false)}>
									Cancel
								</button>
							</div>
						</form>
					)}
				</div>
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
			</main>
		</>
	);
}
