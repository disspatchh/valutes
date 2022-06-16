import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchValutes = createAsyncThunk(
  "valutes/fetchValutes",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch("https://www.cbr-xml-daily.ru/latest.js");

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const valutesSlice = createSlice({
  name: "valutes",
  initialState: {
    valutesList: [],
    baseValute: "RUB",
    loading: false,
    error: null,
    // статичный массив с курсами для рубля, в силу отсутствия возможности выбирать базовую валюту
    rublesValues: [],
  },
  reducers: {
    changeBaseValute(state, action) {
      state.baseValute = action.payload.baseValute;
      state.valutesList = action.payload.newValutesList;
    },
  },
  extraReducers: {
    [fetchValutes.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchValutes.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.valutesList = Object.entries(action.payload.rates);
      state.baseValute = action.payload.base;
      state.rublesValues = Object.entries(action.payload.rates);
    },
    [fetchValutes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { changeBaseValute } = valutesSlice.actions;

export default valutesSlice.reducer;
