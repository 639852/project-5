import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NewTicket from './pages/Ticket';
import Tickets from './pages/Tickets';

interface route {
  path: string;
  element: EmotionJSX.Element;
}

export const sidebarRoute: route = {
  path: '/',
  element: <Sidebar />,
};

export const loginRoute: route = {
  path: '/',
  element: <Login />,
};

export const dashboardRoute: route = {
  path: '/dashboard',
  element: <Dashboard />,
};

export const ticketsRoute: route = {
  path: '/tickets',
  element: <Tickets />,
};

export const newTicketRoute: route = {
  path: '/tickets/new',
  element: <NewTicket />,
};
