import { configureStore } from '@reduxjs/toolkit';
import featuresReducer from './featuresSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		features: featuresReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
