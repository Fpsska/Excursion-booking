import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Icard, Itime } from './../../types/cardTypes';

// /. imports

interface mainSliceState {
    servicesData: Icard[];
}

// /. interfaces

const initialState: mainSliceState = {
    servicesData: [
        {
            id: 1,
            image: 'image-1.png',
            caption: 'новинка',
            duration: '2 чаcа',
            title: 'АКЦИЯ - Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2019',
            description: [
                {
                    id: 1,
                    text: 'Билет на целый день'
                },
                {
                    id: 2,
                    text: 'Неограниченное число катаний'
                },
                {
                    id: 3,
                    text: '6 остановок у главных достопримечательностей'
                },
                {
                    id: 4,
                    text: 'Ближайший рейс сегодня'
                }
            ],
            flightTimes: [
                {
                    id: 1,
                    time: '11:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 2,
                    time: '12:00',
                    isSelected: true,
                    isVisible: true
                },
                {
                    id: 3,
                    time: '13:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 4,
                    time: '14:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 5,
                    time: '15:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 6,
                    time: '16:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 7,
                    time: '17:00',
                    isSelected: false,
                    isVisible: true
                }
            ],
            prices: [
                {
                    id: 1,
                    general: '900 ₽',
                    additional: '1200 р на причале'
                }
            ]
        },
        {
            id: 2,
            image: 'image-2.png',
            caption: 'круглый год',
            duration: '2 чаcа',
            title: 'Обзорная экскурсия по рекам и каналам с остановками Hop on Hop Off 2020',
            description: [
                {
                    id: 1,
                    text: 'Билет на целый день'
                },
                {
                    id: 2,
                    text: 'Неограниченное число катаний'
                },
                {
                    id: 3,
                    text: '6 остановок у главных достопримечательностей'
                },
                {
                    id: 4,
                    text: 'Ближайший рейс сегодня'
                }
            ],
            flightTimes: [
                {
                    id: 1,
                    time: '12:00',
                    isSelected: false,
                    isVisible: true
                },
                {
                    id: 2,
                    time: '13:00',
                    isSelected: false,
                    isVisible: true
                }
                ,
                {
                    id: 3,
                    time: '14:00',
                    isSelected: true,
                    isVisible: true
                },
                {
                    id: 4,
                    time: '15:00',
                    isSelected: false,
                    isVisible: true
                }
            ],
            prices: [
                {
                    id: 1,
                    general: '2900 ₽',
                    additional: ''
                }
            ]
        }
    ]
};

// /. initialState

const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        switchTimeOptSelectedStatus(state, action: PayloadAction<{ service_id: number, option_id: number }>) {
            const { service_id, option_id } = action.payload;

            const targetServiceIDX = state.servicesData.findIndex(
                (service: Icard) => service.id === service_id
            );

            state.servicesData[targetServiceIDX]?.flightTimes
                .map((opt: Itime) => opt.id === option_id ? opt.isSelected = true : opt.isSelected = false);
        },
        switchTimeOptVisibleStatus(state, action: PayloadAction<{ service_id: number }>) {
            const { service_id } = action.payload;

            const targetService = state.servicesData.find(
                (service: Icard) => service.id === service_id
            );

            if (targetService) {
                targetService.flightTimes.map((opt: Itime, idx) => idx >= 3 ? opt.isVisible = false : opt.isVisible = true);
            }
        },
        setVisibleForAllTimeOpt(state, action: PayloadAction<{ service_id: number }>) {
            const { service_id } = action.payload;

            const targetService = state.servicesData.find(
                (service: Icard) => service.id === service_id
            );

            if (targetService) {
                targetService.flightTimes.map((opt: Itime) => opt.isVisible = true);
            }
        }
    }
});

export const { switchTimeOptSelectedStatus, switchTimeOptVisibleStatus, setVisibleForAllTimeOpt } = mainSlice.actions;

export default mainSlice.reducer;