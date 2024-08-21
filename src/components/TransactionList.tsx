import React from 'react';
import { mockTransactions } from '../mock/mockTransactions';
import Transaction from './Transaction';
import TransactionTotal from './TransactionTotal';

const totalTransactions = 2082.79; // Montant fixe que vous souhaitez afficher

interface Transaction {
	amount: number;
	date: string;
	description: string;
}
const TransactionList: React.FC = () => {
	return (
		<main className="main bg-dark">
			<TransactionTotal total={totalTransactions} />
			<div className="transaction-header">
				<span className="dropdown-arrow"></span>
				<span className="transaction-date">Date</span>
				<span className="transaction-description">Description</span>
				<span className="transaction-amount">Montant</span>
				<span className="transaction-balance">Solde</span>
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
