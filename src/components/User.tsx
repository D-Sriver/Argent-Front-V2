import { Link } from 'react-router-dom';

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
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Checking (x8349)</h3>
						<p className="account-amount">$2,082.79</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<Link to="/transactions" className="transaction-button">
							View transactions
						</Link>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Savings (x6712)</h3>
						<p className="account-amount">$10,928.42</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<Link to="/transactions" className="transaction-button">
							View transactions
						</Link>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
						<p className="account-amount">$184.30</p>
						<p className="account-amount-description">Current Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<Link to="/transactions" className="transaction-button">
							View transactions
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
