import { Link } from 'react-router-dom';
import { accounts } from '../mock/mockUser';
import { Account } from '../types/User.types';

export default function User() {
	return (
		<>
			<main className="main bg-dark">
				<div className="header">
					<h1>Welcome back</h1>
					<form className="edit-form">
						<div className="edit-form-inputs">
							<input type="text" placeholder="Prénom" />
							<input type="text" placeholder="Nom" />
						</div>
						<div className="edit-form-buttons">
							<button type="submit">Save</button>
							<button type="button">Cancel</button>
						</div>
					</form>
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
