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
      // console.log(data.rates);

      return Object.entries(data.rates);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const valutesSlice = createSlice({
  name: "valutes",
  initialState: {
    valutesList: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [fetchValutes.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchValutes.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.valutesList = action.payload;
    },
    [fetchValutes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default valutesSlice.reducer;
