import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export enum SortPropEnum {
    RATING = 'raiting',
    TITLE = 'title',
    PRICE = 'price',
}

export type SortProp = {
    name: string,
    prop: SortPropEnum,
}

export interface FilterState {
    cats: number,
    sort: any,
    asc: boolean,
    searchValue: string,
}

const initialState: FilterState = {
    cats: 0,
    sort: {
        name: "популярности",
        prop: SortPropEnum.RATING,
      },
    asc: true,
    searchValue: '',
}


const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCats(state, action: PayloadAction<number>) {
            state.cats = action.payload;
        } ,
        setSort(state, action: PayloadAction<SortProp>) {
            state.sort = action.payload;
        } ,      
        setAsc(state,  action: PayloadAction<boolean>) {
            state.asc = action.payload;
        },
        setFilters(state,  action: PayloadAction<FilterState>){
            state.sort = action.payload.sort;
            state.cats = Number(action.payload.cats);
            state.asc = Boolean(action.payload.asc);
        },
        setSearchValue(state,  action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    }
})

export const { setCats, setSort, setAsc, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
