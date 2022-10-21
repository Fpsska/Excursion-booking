import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import { fetchRoutesData } from '../api/fetchRoutesData';


// /. imports

interface formSliceState {
    routesData: Iroute[]
    timesData: Itime[]
    routesDataFetchStatus: string
    routesDataErrorStatus: any
}

// /. interfaces

const initialState: formSliceState = {
    routesData: [],
    timesData: [],
    routesDataFetchStatus: '',
    routesDataErrorStatus: null
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchRoutesData.pending.type]: (state) => {
            state.routesDataFetchStatus = 'loading';
        },
        [fetchRoutesData.fulfilled.type]: (state, action: PayloadAction<any>) => {
            const { timesData, routesName } = action.payload;

            state.timesData = timesData;
            state.routesDataFetchStatus = 'success';
            state.routesDataErrorStatus = null;

            state.routesData = routesName;
        },
        [fetchRoutesData.rejected.type]: (state, action: PayloadAction<string>) => {
            state.routesDataFetchStatus = 'failed';
            state.routesDataErrorStatus = action.payload;
        }
    }
});

// export const { } = formSlice.actions;

export default formSlice.reducer;