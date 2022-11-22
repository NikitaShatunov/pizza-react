import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cats: 0,
    sort: {
        name: "популярности",
        prop: "rating",
      },
    asc: true,
    searchValue: '',
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
        },
        setFilters(state, action){
            state.sort = action.payload.sort;
            state.cats = Number(action.payload.cats);
            state.asc = Boolean(action.payload.asc);
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    }
})

export const { setCats, setSort, setAsc, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
