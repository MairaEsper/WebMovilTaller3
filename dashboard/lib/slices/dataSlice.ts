import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GraphType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar';

interface FilterState {
    dateRange: string;
    category: string;
    graphType: GraphType;
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
        setGraphType: (state, action: PayloadAction<GraphType>) => {
            state.graphType = action.payload;
        },
    },
});

export const { setDateRange, setCategory, setGraphType } = dataSlice.actions;

export default dataSlice.reducer;