import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://66b3b57e7fba54a5b7edf027.mockapi.io/QLDiem_158';

export const fetchQLDiem = createAsyncThunk('qlDiem/fetchQLDiem', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addQLDiem = createAsyncThunk('qlDiem/addQLDiem', async (newQLDiem, { rejectWithValue }) => {
    try {
        const response = await axios.post(API_URL, newQLDiem);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateQLDiem = createAsyncThunk('qlDiem/updateQLDiem', async (updatedQLDiem, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedQLDiem.id}`, updatedQLDiem);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteQLDiem = createAsyncThunk('qlDiem/deleteQLDiem', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
