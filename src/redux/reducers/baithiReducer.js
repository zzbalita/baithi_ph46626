import { createSlice } from '@reduxjs/toolkit';
import { fetchQLDiem, addQLDiem, updateQLDiem, deleteQLDiem } from '../actions/baithiActions';

const baiThiSlice = createSlice({
    name: 'qlDiem',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQLDiem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQLDiem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchQLDiem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addQLDiem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addQLDiem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addQLDiem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateQLDiem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQLDiem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateQLDiem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteQLDiem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQLDiem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteQLDiem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const baithiReducer = baiThiSlice.reducer;
export default baithiReducer;
    