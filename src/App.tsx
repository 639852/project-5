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
  apiKey: 'AIzaSyBCNrarb669AGcrmDiZZBVqJ97UizIBrXw',
  authDomain: 'dashboard-c6de9.firebaseapp.com',
  projectId: 'dashboard-c6de9',
  storageBucket: 'dashboard-c6de9.appspot.com',
  messagingSenderId: '948469530326',
  appId: '1:948469530326:web:954265409de1c3ee665377',
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
