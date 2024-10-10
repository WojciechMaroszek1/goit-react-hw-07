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
