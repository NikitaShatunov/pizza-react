import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


export const fetchItems = createAsyncThunk(
    'pizzas/fetchByPizzas',
    async (params, thunkAPI) => {
        const {cats, isAsc, sortType} = params;
        const { data } = await axios.get(
            `https://636106e067d3b7a0a6bbab86.mockapi.io/pizzas?${
              cats > 0 ? `category=${cats}` : ""
            }&sortBy=${sortType}&order=${isAsc ? "asc" : "desc"}`
          );
      return data;
    }
  )
  

const initialState = {
    items: [],
    status: 'loading',
};


const pizzasFetchSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: {
        [fetchItems.pending] : (state) => {
            state.status = 'loading';
            state.items = []
        },
        [fetchItems.fulfilled] : (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchItems.rejected] : (state) => {
            state.status = 'error';
            state.items = [];
        },
    }
})

export const { setItems } = pizzasFetchSlice.actions;

export default pizzasFetchSlice.reducer;
