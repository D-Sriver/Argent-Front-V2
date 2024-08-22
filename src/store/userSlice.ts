import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../types/store.type';

//définir l'état initial dans le store
const initialState: UserState = {
	firstName: '',
	lastName: '',
	email: '',
	isAuthenticated: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		//fonction qui va modifier l'état
		//setUser : définir l'état initial du user
		setUser: (
			state: UserState, //state : l'état actuel
			action: PayloadAction<{
				//action : l'action qui va modifier l'état
				firstName: string;
				lastName: string;
				email: string;
			}>
		) => {
			//action : l'action qui va modifier l'état
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.email = action.payload.email;
			state.isAuthenticated = true; //définir si l'utilisateur est authentifié
		},
		clearUser: (state: UserState) => {
			state.firstName = '';
			state.lastName = '';
			state.email = '';
			state.isAuthenticated = false;
		},
		updateUserName: (
			state: UserState,
			action: PayloadAction<{ firstName: string; lastName: string }>
		) => {
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
		},
	},
});

export const { setUser, clearUser, updateUserName } = userSlice.actions;

export default userSlice.reducer;
