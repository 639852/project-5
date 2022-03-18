/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { setUser } from '../store/slices/userSlice';
import { changeCurrentPage } from '../store/slices/utilsSlice';
import { dashboardStyles } from '../style';
import Header from '../components/Header';
import DashboardItem from '../components/DashboardItem';
import BarChart from '../components/BarChart';
import { RootState } from '../store';
import { Row } from '../store/slices/ticketSlice';
import { getDataBar } from '../store/slices/barChartSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tickets } = useSelector((state: RootState) => state.tickets);
  const { name } = useSelector((state: RootState) => state.user);
  const allTickets = tickets.length;

  function uncompletedTickets(priority: string, myItems?: boolean) {
    const counter = tickets.filter((el: Row) => {
      const p = el.priority === `${priority}`;
      const n = el.name === name;
      const c = el.isComplete;

      return myItems ? p && n && !c : p && !c;
    });

    return counter.length;
  }

  const items = [
    {
      title: 'Total High',
      counter: uncompletedTickets('high'),
    },
    {
      title: 'Total Normal',
      counter: uncompletedTickets('normal'),
    },
    {
      title: 'Total Low',
      counter: uncompletedTickets('low'),
    },
    {
      title: 'Total Uncompleted',
      counter: tickets.filter((el: Row) => !el.isComplete).length,
      after: `${
        Math.round(
          (tickets.filter((el: Row) => !el.isComplete).length / allTickets) *
            100
        ) || '0'
      }%`,
    },
  ];

  const myItems = [
    {
      title: 'High',
      counter: uncompletedTickets('high', true),
    },
    {
      title: 'Normal',
      counter: uncompletedTickets('normal', true),
    },
    {
      title: 'Low',
      counter: uncompletedTickets('low', true),
    },
    {
      title: 'Uncompleted',
      counter: tickets.filter((el: Row) => el.name === name && !el.isComplete)
        .length,
      after: `${
        Math.round(
          (tickets.filter((el: Row) => el.name === name && !el.isComplete)
            .length /
            tickets.filter((el: Row) => el.name === name).length) *
            100
        ) || '0'
      }%`,
    },
  ];

  useEffect(() => {
    const userString = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userString);

    document.title = 'Dashboard';

    if (userString !== '{}') {
      dispatch(setUser({ ...user }));
      dispatch(changeCurrentPage({ currentPage: 'Dashboard' }));
    } else {
      navigate('/');
    }

    dispatch(getDataBar());
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <main style={{ display: 'grid', gridGap: '30px' }}>
        <div css={dashboardStyles}>
          {items.map(({ title, counter, after }) => (
            <DashboardItem
              key={title}
              title={title}
              counter={counter}
              after={after}
            />
          ))}
        </div>
        <BarChart />
        <div css={dashboardStyles}>
          {myItems.map(({ title, counter, after }) => (
            <DashboardItem
              key={title}
              title={title}
              counter={counter}
              after={after}
            />
          ))}
        </div>
      </main>
      <Toaster />
    </>
  );
}

export default Dashboard;
