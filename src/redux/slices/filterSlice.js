import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cats: 0,
    sort: {
        name: "популярности",
        prop: "rating",
      },
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCats(state, action) {
            state.cats = action.payload;
        }        
    }
})

export const { setCats } = filterSlice.actions;

export default filterSlice.reducer;
