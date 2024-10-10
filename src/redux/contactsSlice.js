// import { createSlice } from '@reduxjs/toolkit';
// import initialContacts from './constans.json';
// import uuid4 from 'uuid4';

// const loadInitialContacts = () => {
// 	const savedContacts = localStorage.getItem('contacts');
// 	if (savedContacts) {
// 		const parsedContacts = JSON.parse(savedContacts);
// 		if (parsedContacts.length > 0) {
// 			return parsedContacts;
// 		}
// 	}
// 	return initialContacts.map(contact => ({
// 		...contact,
// 		id: uuid4(),
// 	}));
// };

// const isExist = (contacts, newContact) => {
// 	const existContact = contacts.find(
// 		contact => contact.name.toLowerCase() === newContact.name.toLowerCase() && contact.number === newContact.number
// 	);

// 	if (existContact) {
// 		return 'This name and number already exist.';
// 	}

// 	const existName = contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());

// 	const existNumber = contacts.some(contact => contact.number === newContact.number);

// 	if (existName) {
// 		return 'This name already exists.';
// 	} else if (existNumber) {
// 		return 'This number already exists.';
// 	}

// 	return null;
// };

// const contactsSlice = createSlice({
// 	name: 'contacts',
// 	initialState: {
// 		items: loadInitialContacts(),
// 		error: null,
// 	},
// 	reducers: {
// 		addContact: (state, action) => {
// 			const errorMessage = isExist(state.items, action.payload);
// 			if (errorMessage) {
// 				state.error = errorMessage;
// 			} else {
// 				state.items.push(action.payload);
// 				state.error = null;
// 			}
// 		},
// 		removeContact: (state, action) => {
// 			state.items = state.items.filter(contact => contact.id !== action.payload);
// 			if (state.items.length === 0) {
// 				state.items = loadInitialContacts();
// 			}
// 		},
// 		clearErrors: state => {
// 			state.error = null;
// 		},
// 	},
// });

// export const { addContact, removeContact, clearErrors } = contactsSlice.actions;
// export default contactsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './operations';

import api from '../api/api';

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
	const response = await api.get('/');
	return response.data;
});

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.items = action.payload;
				state.loading = false;
			})
			.addCase(fetchContacts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.items = state.items.filter(contact => contact.id !== action.payload);
			});
	},
});

export default contactsSlice.reducer;
