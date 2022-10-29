import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Iroute, Itime } from '../../types/timetableFormTypes';

import { fetchRoutesData } from '../api/fetchRoutesData';


// /. imports

interface formSliceState {
    routesData: Iroute[]
    timesData: Itime[]
    filteredTimesData: Itime[]
    convertedTimesData: Itime[]
    routesDataFetchStatus: string
    routesDataErrorStatus: any
}

// /. interfaces

const initialState: formSliceState = {
    routesData: [],
    timesData: [],
    filteredTimesData: [],
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
            state.convertedTimesData = action.payload;
        },
        filterTimesData(state, action: PayloadAction<{ filterProp: string }>) {
            const { filterProp } = action.payload;
            state.convertedTimesData = state.filteredTimesData.filter((item: Itime) => item.value.includes(filterProp));
        }
    },
    extraReducers: {
        [fetchRoutesData.pending.type]: (state) => {
            state.routesDataFetchStatus = 'loading';
        },
        [fetchRoutesData.fulfilled.type]: (state, action: PayloadAction<any>) => {
            const { timesData, routesName } = action.payload;

            state.timesData = timesData;
            state.filteredTimesData = timesData;
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

export const { setConvertedTimesData, filterTimesData } = formSlice.actions;

export default formSlice.reducer;