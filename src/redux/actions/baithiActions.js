import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66b3b57e7fba54a5b7edf027.mockapi.io/THI138';

export const fetchBaiThi = createAsyncThunk('baiThi/fetchBaiThi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addBaiThi = createAsyncThunk('baiThi/addBaiThi', async (newBaiThi, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, newBaiThi);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateBaiThi = createAsyncThunk('baiThi/updateBaiThi', async (updatedBaiThi, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedBaiThi.id}`, updatedBaiThi);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteBaiThi = createAsyncThunk('baiThi/deleteBaiThi', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
