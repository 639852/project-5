import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  dashboardRoute,
  loginRoute,
  newTicketRoute,
  sidebarRoute,
  ticketsRoute,
} from './routes';
import Ticket from './pages/Ticket';
import './App.css';
import { getTickets } from './store/slices/ticketSlice';

initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTickets());

    const body = document.querySelector('body');
    const darkThemeIcon = document.querySelector(
      'svg[data-testid="Brightness4Icon"]'
    );
    const lightThemeIcon = document.querySelector(
      'svg[data-testid="Brightness5Icon"]'
    );

    if (localStorage.getItem('theme') === 'dark') {
      body?.classList.add('dark');
      darkThemeIcon?.classList.add('active');
      lightThemeIcon?.classList.remove('active');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={sidebarRoute.path} element={sidebarRoute.element}>
          <Route index element={loginRoute.element} />
          <Route path={dashboardRoute.path} element={dashboardRoute.element} />
          <Route path={ticketsRoute.path} element={ticketsRoute.element} />
          <Route path={newTicketRoute.path} element={newTicketRoute.element} />
          <Route path="tickets/:id" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
