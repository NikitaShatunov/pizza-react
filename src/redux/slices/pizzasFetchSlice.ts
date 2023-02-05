import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { SortProp } from "./filterSlice";

export type SearchParams = {
    cats: number;
    isAsc: boolean;
    sortType: SortProp;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
} 

type Pizza = {
    id: string;
    title: string;
    price: number;
    count: number;
    imageUrl: string;
    type: number[];
    size: number[];
  }
  interface PizzasFetchSliceState {
    items: Pizza[];
    status: Status;
}

type FetchPizza = {
    cats: number;
    isAsc: boolean;
    sortType: any;
}

export const fetchItems = createAsyncThunk(
    'pizzas/fetchByPizzas',
    async (params: FetchPizza) => {
        const {cats, isAsc, sortType} = params;
        const { data } = await axios.get<Pizza[]>(
            `https://636106e067d3b7a0a6bbab86.mockapi.io/pizzas?${
              cats > 0 ? `category=${cats}` : ""
            }&sortBy=${sortType.prop}&order=${isAsc ? "asc" : "desc"}`
          );
      return data as Pizza[];
    }
  )
  

const initialState: PizzasFetchSliceState = {
    items: [],
    status: Status.LOADING,
};


const pizzasFetchSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = Status.LOADING;
            state.items = []
        })
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = []
        })
    }
})

export const { setItems } = pizzasFetchSlice.actions;

export default pizzasFetchSlice.reducer;
