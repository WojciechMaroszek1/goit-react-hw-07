import api from '../api/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addContact = createAsyncThunk('contacts/addContact', async (contact, { getState, rejectWithValue }) => {
	const { contacts } = getState();
	const duplicate = contacts.items.find(item => item.name === contact.name || item.phone === contact.phone);

	if (duplicate) {
		return rejectWithValue('Contact with the same name or phone number already exists.');
	}

	const response = await api.post('/', contact);
	return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
	await api.delete(`/${id}`);
	return id;
});
