import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filters',
	initialState: {
		status: 'all',
		filter: '', // Added filter field to state
	},
	reducers: {
		setFilter: (state, action) => {
			state.filter = action.payload; // Filter value
		},
		setStatus: (state, action) => {
			state.status = action.payload; // Status
		},
	},
});

export const { setFilter, setStatus } = filtersSlice.actions;
export default filtersSlice.reducer;
