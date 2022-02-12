/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const getDataBar = createAsyncThunk(
  'tickets/getDataBar',
  // eslint-disable-next-line func-names
  async function (_, { rejectWithValue }) {
    try {
      const database = getFirestore();
      const response = await getDocs(collection(database, 'dataBar'));
      const dataBar: object[] = [];

      response.forEach((barChart) => dataBar.push(barChart.data()));

      return dataBar;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const barChartSlice = createSlice({
  name: 'barChart',
  initialState: {
    dataBar: [],
  },
  reducers: {
    setDataBar(state, action) {
      state.dataBar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDataBar.pending, () => {
      if (localStorage.getItem('theme') === 'dark') {
        toast.loading('Loading...', {
          style: {
            background: '#363740',
            color: '#fff',
          },
        });
      } else {
        toast.loading('Loading...');
      }
    });
    builder.addCase(
      getDataBar.fulfilled,
      (state: { dataBar: object[] }, action) => {
        state.dataBar = action.payload;

        toast.dismiss();
      }
    );
    builder.addCase(getDataBar.rejected, () => {
      if (localStorage.getItem('theme') === 'dark') {
        toast.error('Failed to load bar chart. Try again later...', {
          style: {
            background: '#363740',
            color: '#fff',
          },
        });
      } else {
        toast.error('Failed to load bar chart. Try again later...');
      }
    });
  },
});

export const { setDataBar } = barChartSlice.actions;
export default barChartSlice.reducer;
