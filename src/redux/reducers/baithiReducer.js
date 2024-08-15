import { createSlice } from '@reduxjs/toolkit';
import { fetchBaiThi, addBaiThi, updateBaiThi, deleteBaiThi } from '../actions/baithiActions';

const baiThiSlice = createSlice({
    name: 'baiThi',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBaiThi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBaiThi.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBaiThi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBaiThi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBaiThi.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addBaiThi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateBaiThi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBaiThi.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateBaiThi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteBaiThi.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBaiThi.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteBaiThi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const baithiReducer = baiThiSlice.reducer;
export default baithiReducer;
