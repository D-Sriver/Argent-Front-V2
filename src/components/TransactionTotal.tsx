import React from 'react';

interface TransactionTotalProps {
	total: number;
}

const TransactionTotal: React.FC<TransactionTotalProps> = ({ total }) => {
	const formattedTotal = total.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return (
		<div className="transaction-total">
			<h2>Argent bank cheking (x8349)</h2>
			<p className="transaction-total-amount">$ {formattedTotal}</p>
			<h3>Available balance</h3>
		</div>
	);
};

export default TransactionTotal;
