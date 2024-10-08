import React from 'react';
import { AccountSectionProps } from '../types/Account.types';

const AccountSection: React.FC<AccountSectionProps> = ({
	title,
	amount,
	description,
}) => {
	return (
		<section className="account">
			<div className="account-content-wrapper">
				<h3 className="account-title">{title}</h3>
				<p className="account-amount">${amount.toFixed(2)}</p>
				<p className="account-amount-description">{description}</p>
			</div>
			<div className="account-content-wrapper cta">
				<button className="transaction-button" disabled>
					View transactions
				</button>
			</div>
		</section>
	);
};

export default AccountSection;
