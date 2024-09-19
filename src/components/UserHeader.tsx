import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../api/Axios';
import { setUser } from '../store/userSlice';

interface UserHeaderProps {
	firstName: string;
	lastName: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ firstName, lastName }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedFirstName, setEditedFirstName] = useState(firstName);
	const [editedLastName, setEditedLastName] = useState(lastName);

	const handleEdit = () => {
		setIsEditing(true);
		setEditedFirstName(firstName);
		setEditedLastName(lastName);
	};

	const handleSave = async () => {
		try {
			const token = sessionStorage.getItem('userToken');
			if (!token) {
				console.error("Token d'authentification manquant");
				return;
			}
			const updatedUserData = await updateUserProfile(
				token,
				editedFirstName,
				editedLastName
			);
			if (updatedUserData.status === 200) {
				dispatch(
					setUser({
						firstName: editedFirstName,
						lastName: editedLastName,
						email: updatedUserData.body.email,
					})
				);
				sessionStorage.setItem('userFirstName', editedFirstName);
				sessionStorage.setItem('userLastName', editedLastName);
				setIsEditing(false);
			} else {
				throw new Error('La mise à jour a échoué');
			}
		} catch (error) {
			console.error(
				'Erreur lors de la mise à jour des données utilisateur:',
				error
			);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	return (
		<div className="header">
			<h1>Welcome back</h1>
			{isEditing ? (
				<form
					className="edit-form"
					onSubmit={(e) => {
						e.preventDefault();
						handleSave();
					}}
				>
					<div className="edit-form-inputs">
						<input
							type="text"
							value={editedFirstName}
							onChange={(e) => setEditedFirstName(e.target.value)}
						/>
						<input
							type="text"
							value={editedLastName}
							onChange={(e) => setEditedLastName(e.target.value)}
						/>
					</div>
					<div className="edit-form-buttons">
						<button type="submit">Save</button>
						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<>
					<div className="user-name">
						{firstName} {lastName} !
					</div>
					<button className="edit-button" onClick={handleEdit}>
						Edit Name
					</button>
				</>
			)}
		</div>
	);
};

export default UserHeader;
