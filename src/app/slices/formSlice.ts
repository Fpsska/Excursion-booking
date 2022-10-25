import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import { fetchRoutesData } from '../api/fetchRoutesData';


// /. imports

interface formSliceState {
    routesData: Iroute[]
    timesData: Itime[]
    convertedTimesData: Itime[]
    routesDataFetchStatus: string
    routesDataErrorStatus: any
}

// /. interfaces

const initialState: formSliceState = {
    routesData: [],
    timesData: [],
    convertedTimesData: [],
    routesDataFetchStatus: '',
    routesDataErrorStatus: null
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        setConvertedTimesData(state, action: PayloadAction<Itime[]>) {
            console.log(action.payload)
            state.convertedTimesData = action.payload;
        }
    },
    extraReducers: {
        [fetchRoutesData.pending.type]: (state) => {
            state.routesDataFetchStatus = 'loading';
        },
        [fetchRoutesData.fulfilled.type]: (state, action: PayloadAction<any>) => {
            const { timesData, routesName } = action.payload;

            state.timesData = timesData;
            state.routesData = routesName;

            state.routesDataFetchStatus = 'success';
            state.routesDataErrorStatus = null;
        },
        [fetchRoutesData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.routesDataFetchStatus = 'failed';
            state.routesDataErrorStatus = action.payload;
        }
    }
});

export const { setConvertedTimesData } = formSlice.actions;

export default formSlice.reducer;