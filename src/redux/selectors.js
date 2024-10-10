import { createSelector } from '@reduxjs/toolkit';

const selectContactsState = state => state.contacts;
const selectFilterState = state => state.filters.status;

// Memoized selector to filter contacts
export const selectFilteredContacts = createSelector(
	[selectContactsState, selectFilterState],
	(contactsState, filter) => {
		return filter
			? contactsState.items.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
			: contactsState.items;
	}
);
