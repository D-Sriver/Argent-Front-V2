import React from 'react';

interface TransactionTotalProps {
	total: number;
}

const TransactionTotal: React.FC<TransactionTotalProps> = ({ total }) => {
	return (
		<div className="transaction-total">
			<h2>Argent bank cheking(x8349)</h2>
			<p className="transaction-total-amount">{total.toFixed(2)} €</p>
			<h3>Available balance</h3>
		</div>
	);
};

export default TransactionTotal;
