import { configureStore } from '@reduxjs/toolkit';
import barChartReducer from './slices/barChartSlice';
import ticketReducer from './slices/ticketSlice';
import userReducer from './slices/userSlice';
import utilsReducer from './slices/utilsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tickets: ticketReducer,
    utils: utilsReducer,
    barChart: barChartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
