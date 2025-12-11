import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    dateRange: string;
    category: string;
    graphType: 'bar' | 'line' | 'pie';
}

const initialState: FilterState = {
    dateRange: 'last 7 days',
    category: 'all',
    graphType: 'bar',
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDateRange: (state, action: PayloadAction<string>) => {
            state.dateRange = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setGraphType: (state, action: PayloadAction<'bar' | 'line' | 'pie'>) => {
            state.graphType = action.payload;
        },
    },
});

export const { setDateRange, setCategory, setGraphType } = dataSlice.actions;

export default dataSlice.reducer;