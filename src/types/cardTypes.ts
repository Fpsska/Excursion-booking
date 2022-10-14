export interface Icard {
    id: number
    image: string
    title: string
    caption: string
    duration: string
    flightTimes: Itime[]
    description: Idescription[]
    prices: Iprice[]
}

export interface Itime {
    id: number
    time: string
}

export interface Idescription {
    id: number
    text: string
}

export interface Iprice {
    id: number
    general: string
    additional: string
}