/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { GridViewRounded, TableRows } from '@mui/icons-material';
import { setUser } from '../store/slices/userSlice';
import { changeCurrentPage } from '../store/slices/utilsSlice';
import {
  actionsTicketsStyles,
  ticketsStyles,
  viewTicketsStyles,
} from '../style';
import Header from '../components/Header';
import TicketsTable from '../components/TicketsTable';

function Tickets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [view, setView] = useState('table');

  useEffect(() => {
    const userString = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userString);

    document.title = 'Tickets';

    if (userString !== '{}') {
      dispatch(setUser({ ...user }));
      dispatch(changeCurrentPage({ currentPage: 'Tickets' }));
    } else {
      navigate('/');
    }
  }, []);

  function changeView(element: SVGSVGElement) {
    if (!element.classList.contains('active')) {
      const elements = element.parentElement?.children || [];

      Array.from(elements).forEach((el) => {
        el.classList.remove('active');
      });

      element.classList.add('active');

      if (view === 'table') {
        setView('grid');
      } else {
        setView('table');
      }
    }
  }

  return (
    <>
      <Header title="Tickets" search />
      <main css={ticketsStyles} className="theme">
        <div css={actionsTicketsStyles}>
          <h2>All tickets</h2>
          <Button
            variant="contained"
            size="large"
            sx={{ margin: '0 auto 0 30px', textTransform: 'none' }}
            onClick={() => navigate('/tickets/new')}
          >
            New Ticket
          </Button>
          <div css={viewTicketsStyles}>
            <p>View:</p>
            <GridViewRounded onClick={(e) => changeView(e.currentTarget)} />
            <TableRows
              className="active"
              onClick={(e) => changeView(e.currentTarget)}
            />
          </div>
        </div>
        <TicketsTable view={view} />
      </main>
    </>
  );
}

export default Tickets;
