/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

export interface Row {
  details: {
    title: string;
    avatar: string;
    date: string;
  };
  id: number;
  name: string;
  date: {
    date: string;
    time: string;
  };
  timestamp: number;
  priority: string;
  description: string;
  isDelete: boolean;
  isComplete: boolean;
}

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  // eslint-disable-next-line func-names
  async function (_, { rejectWithValue }) {
    try {
      const database = getFirestore();
      const response = await getDocs(collection(database, 'tickets'));
      const tickets: object[] = [];

      response.forEach((ticket) => tickets.push(ticket.data()));

      return tickets;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
  },
  reducers: {
    addTicket(state: { tickets: Row[] }, action) {
      state.tickets.push(action.payload.ticket);
    },
    removeTicket(state: { tickets: Row[] }, action) {
      const database = getFirestore();

      state.tickets = state.tickets.filter((el) => el.id !== action.payload.id);
      deleteDoc(doc(database, 'tickets', `${action.payload.id}`));

      toast.success(`Ticket "${action.payload.details.title}" deleted!`);
    },
    editTicket(state: { tickets: Row[] }, action) {
      const index = state.tickets.findIndex(
        (el) => el.id === action.payload.id
      );

      state.tickets[index].details.title = action.payload.details.title;
      state.tickets[index].details.date = action.payload.details.date;
      state.tickets[index].date = action.payload.date;
      state.tickets[index].description = action.payload.description;
      state.tickets[index].priority = action.payload.priority;
      state.tickets[index].timestamp = action.payload.timestamp;

      toast.success('Saved successfully');
    },
    setDelete(state: { tickets: Row[] }, action) {
      const index = state.tickets.findIndex(
        (el) => el.id === action.payload.id
      );

      state.tickets[index].isDelete = action.payload.isDelete;
    },
    setComplete(state: { tickets: Row[] }, action) {
      const database = getFirestore();
      const index = state.tickets.findIndex(
        (el) => el.id === +action.payload.id
      );

      state.tickets[index].isComplete = action.payload.isComplete;
      setDoc(
        doc(database, 'tickets', `${action.payload.id}`),
        state.tickets[index]
      );

      toast.success('Saved successfully');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTickets.pending, () => {
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
      getTickets.fulfilled,
      (state: { tickets: object[] }, action) => {
        state.tickets = action.payload;

        toast.dismiss();
      }
    );
    builder.addCase(getTickets.rejected, () => {
      toast.error('Failed to load tickets. Try again later...');
    });
  },
});

export type Order = 'asc' | 'desc';

export const { addTicket, removeTicket, editTicket, setDelete, setComplete } =
  ticketSlice.actions;
export default ticketSlice.reducer;
