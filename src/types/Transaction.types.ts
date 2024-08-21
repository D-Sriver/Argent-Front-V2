export interface Transaction {
	amount: number;
	date: string;
	description: string;
}

export interface TransactionProps {
	date: string;
	description: string;
	amount: number;
	balance: number;
	details: {
		type: string;
		category: string;
		notes: string;
	};
}

export interface TransactionTotalProps {
	total: number;
}
