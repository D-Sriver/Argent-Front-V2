import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import AccountSection from './AccountSection';
import UserHeader from './UserHeader';

const accountsData = [
	{
		title: 'Argent Bank Checking (x8349)',
		amount: 2082.79,
		description: 'Available Balance',
	},
	{
		title: 'Argent Bank Savings (x6712)',
		amount: 10928.42,
		description: 'Available Balance',
	},
	{
		title: 'Argent Bank Credit Card (x8349)',
		amount: 184.3,
		description: 'Current Balance',
	},
];

export default function User() {
	const { firstName, lastName } = useSelector((state: RootState) => state.user);

	return (
		<main className="main bg-dark">
			<UserHeader firstName={firstName} lastName={lastName} />
			<h2 className="sr-only">Accounts</h2>
			{accountsData.map((account, index) => (
				<AccountSection
					key={index}
					title={account.title}
					amount={account.amount}
					description={account.description}
				/>
			))}
		</main>
	);
}
