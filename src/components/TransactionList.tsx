import React from 'react';
import Transaction from './Transaction';
import TransactionTotal from './TransactionTotal';

const mockTransactions = [
	{
		date: 'June 20th, 2020',
		description: 'Golden Sun Bakery',
		amount: 5.0,
		balance: 2082.79,
		details: {
			type: 'Electronic',
			category: 'Food',
			notes: 'Weekly grocery shopping at SuperMarket',
		},
	},
	{
		date: 'June 20th, 2020',
		description: 'Golden Sun Bakery',
		amount: 10.0,
		balance: 2072.79,
		details: {
			type: 'Cash',
			category: 'Entertainment',
			notes: 'Movie tickets',
		},
	},
	{
		date: 'June 20th, 2020',
		description: 'Golden Sun Bakery',
		amount: 20.0,
		balance: 2062.79,
		details: {
			type: 'Electronic',
			category: 'Bills',
			notes: 'Monthly internet subscription',
		},
	},
];

const TransactionList: React.FC = () => {
	const totalTransactions = mockTransactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0
	);

	return (
		<main className="main bg-dark">
			<TransactionTotal total={totalTransactions} />
			<div className="transaction-header">
				<span className="dropdown-arrow"></span>
				<span className="transaction-date">Date</span>
				<span className="transaction-description">Description</span>
				<span className="transaction-amount">Amount</span>
				<span className="transaction-balance">Balance</span>
			</div>
			<div className="transaction-container">
				{mockTransactions.map((transaction, index) => (
					<Transaction key={index} {...transaction} />
				))}
			</div>
		</main>
	);
};

export default TransactionList;
