import React, { useState } from 'react';
import { TransactionProps } from '../../types/Transaction.types';

const Transaction: React.FC<TransactionProps> = ({
	date,
	description,
	amount,
	balance,
	details,
}: TransactionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isEditing, setIsEditing] = useState({
		category: false,
		notes: false,
	});
	const [editedDetails, setEditedDetails] = useState(details);

	const handleEdit = (field: 'category' | 'notes') => {
		setIsEditing({ ...isEditing, [field]: true });
	};

	const handleSave = (field: 'category' | 'notes') => {
		setIsEditing({ ...isEditing, [field]: false });
		// Ici, vous implémenteriez la logique pour sauvegarder les modifications
	};

	const handleCancel = (field: 'category' | 'notes') => {
		setEditedDetails({ ...editedDetails, [field]: details[field] });
		setIsEditing({ ...isEditing, [field]: false });
	};

	return (
		<div className="transaction">
			<div
				className="transaction-main"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<i
					className={`fa-sharp fa-solid fa-angle-right dropdown-arrow ${
						isExpanded ? 'expanded' : ''
					}`}
				></i>
				<span data-label="Date" className="transaction-date">
					{date}
				</span>
				<span data-label="Description" className="transaction-description">
					{description}
				</span>
				<span data-label="Montant" className="transaction-amount">
					$ {amount.toFixed(2)}
				</span>
				<span data-label="Solde" className="transaction-balance">
					$ {balance.toFixed(2)}
				</span>
			</div>
			{isExpanded && (
				<div className="transaction-details">
					<p>Type de transaction : {details.type}</p>
					<div className="editable-field">
						<span>Catégorie : </span>
						{isEditing.category ? (
							<>
								<input
									type="text"
									value={editedDetails.category}
									onChange={(e) =>
										setEditedDetails({
											...editedDetails,
											category: e.target.value,
										})
									}
								/>
								<button onClick={() => handleSave('category')}>Valider</button>
								<button onClick={() => handleCancel('category')}>
									Annuler
								</button>
							</>
						) : (
							<>
								<span>{details.category}</span>
								<button
									className="edit-button"
									onClick={() => handleEdit('category')}
								>
									<i className="fas fa-pencil-alt"></i>
								</button>
							</>
						)}
					</div>
					<div className="editable-field">
						<span>Notes : </span>
						{isEditing.notes ? (
							<>
								<input
									type="text"
									value={editedDetails.notes}
									onChange={(e) =>
										setEditedDetails({
											...editedDetails,
											notes: e.target.value,
										})
									}
								/>
								<button onClick={() => handleSave('notes')}>Valider</button>
								<button onClick={() => handleCancel('notes')}>Annuler</button>
							</>
						) : (
							<>
								<span>{details.notes}</span>
								<button
									className="edit-button"
									onClick={() => handleEdit('notes')}
								>
									<i className="fas fa-pencil-alt"></i>
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Transaction;
