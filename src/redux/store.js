import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice.js';
import filtersReducer from './filtersSlice.js';

const store = configureStore({
	reducer: {
		contacts: contactsReducer,
		filters: filtersReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export { store };
