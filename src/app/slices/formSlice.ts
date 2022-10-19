import { createSlice } from '@reduxjs/toolkit';

import { Iroute, Itime } from '../../types/timetableFormTypes';

// /. imports

interface formSliceState {
    routesData: Iroute[]
    timesData: Itime[]
}

// /. interfaces

const initialState: formSliceState = {
    routesData: [
        {
            id: 1,
            value: 'из A в B'
        },
        {
            id: 2,
            value: 'из B в A'
        },
        {
            id: 3,
            value: 'из A в B и обратно в А'
        }
    ],
    timesData: [
        {
            id: 1,
            value: '18:00(из A в B)'
        },
        {
            id: 2,
            value: '18:30(из A в B)'
        },
        {
            id: 3,
            value: '18:45(из A в B)'
        },
        {
            id: 4,
            value: '19:00(из A в B)'
        },
        {
            id: 5,
            value: '19:15(из A в B)'
        },
        {
            id: 6,
            value: '21:00(из A в B)'
        },
        {
            id: 7,
            value: '18:30(из B в A)'
        },
        {
            id: 8,
            value: '18:45(из B в A)'
        },
        {
            id: 9,
            value: '19:00(из B в A)'
        },
        {
            id: 10,
            value: '19:15(из B в A)'
        },
        {
            id: 11,
            value: '19:35(из B в A)'
        },
        {
            id: 12,
            value: '21:50(из B в A)'
        },
        {
            id: 13,
            value: '21:55(из B в A)'
        }
    ]
};

// /. initialState

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {

    }
});

// export const { } = formSlice.actions;

export default formSlice.reducer;