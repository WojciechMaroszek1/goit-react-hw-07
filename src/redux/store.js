import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localstorage for web
import contactsReducer from './contactsSlice.js';
import filtersReducer from './filtersSlice.js';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
	reducer: {
		contacts: persistedContactsReducer,
		filters: filtersReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}),
});

const persistor = persistStore(store);

export { store, persistor };
