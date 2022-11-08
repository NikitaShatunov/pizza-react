import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cats: 0,
    sort: {
        name: "популярности",
        prop: "rating",
      },
    asc: true,
}


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCats(state, action) {
            state.cats = action.payload;
        } ,
        setSort(state, action) {
            state.sort = action.payload;
        } ,      
        setAsc(state, action) {
            state.asc = action.payload;
        }
    }
})

export const { setCats, setSort, setAsc } = filterSlice.actions;

export default filterSlice.reducer;
