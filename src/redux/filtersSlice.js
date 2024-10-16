import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
	name: 'filters',
	initialState: {
		status: 'all',
	},
	reducers: {
		setFilter: (state, action) => {
			state.status = action.payload;
		},
	},
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
