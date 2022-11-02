import { createAsyncThunk } from '@reduxjs/toolkit';

// /. imports

export const fetchRoutesData = createAsyncThunk('formSlice/fetchTimesData',
    async (_, { rejectWithValue }) => {
        try {
            const URL = 'https://my-jon-server.typicode.com/Fpsska/mockjson/nevaTripDB';
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error('response error');
            }

            const data = await response.json();
            return data;

        } catch (err: any) {
            console.error(`Error: ${err.message}`);
            return rejectWithValue(err.message); // send to case rejected.type of extreReducers 
        }
    }
);