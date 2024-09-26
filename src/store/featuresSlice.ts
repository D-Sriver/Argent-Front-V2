import { createSlice } from '@reduxjs/toolkit';
import { Feature } from '../types/Features.types';

const initialState: Feature[] = [
	{
		iconSrc: './img/icon-chat.avif',
		title: 'Vous êtes notre priorité n°1',
		description:
			'Besoin de parler à un représentant ? Vous pouvez nous contacter par notre chat 24h/24 et 7j/7, ou par téléphone en moins de 5 minutes.',
	},
	{
		iconSrc: './img/icon-money.avif',
		title: "Plus d'épargne signifie des taux plus élevés",
		description:
			"Plus vous épargnez avec nous, plus votre taux d'intérêt sera élevé !",
	},
	{
		iconSrc: './img/icon-security.avif',
		title: 'Une sécurité en laquelle vous pouvez avoir confiance',
		description:
			'Nous utilisons un cryptage de pointe pour garantir que vos données et votre argent sont toujours en sécurité.',
	},
];

export const featuresSlice = createSlice({
	name: 'features',
	initialState,
	reducers: {},
});

export default featuresSlice.reducer;
