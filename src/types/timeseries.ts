export type TimeSeriesDataParams = {
    customerId: number;
    start: number;
    measId: string;
};

export type TimeSeriesData = {
    tag: number;
    'ts,val': [number, number][];
}[];
