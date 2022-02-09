/* eslint-disable react/jsx-no-bind */
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { setUser } from '../store/slices/userSlice';
import { RootState } from '../store';
import Form from '../components/Form';
import Header from '../components/Header';
import { ticketsStyles } from '../style';
import { addTicket, Row } from '../store/slices/ticketSlice';

function Ticket() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    priority: '',
    title: '',
    description: '',
  });
  const [disabled, setDisable] = useState(false);
  const database = getFirestore();

  const {
    tickets: { tickets },
    user: { name, avatar },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    const userString = localStorage.getItem('user') || '{}';
    const user = JSON.parse(userString);

    if (userString !== '{}') {
      dispatch(setUser({ ...user }));
    } else {
      navigate('/');
    }

    if (id !== undefined && tickets.length) {
      const index = tickets.findIndex((el: Row) => el.id === +id);
      const {
        details: { title },
        description,
        priority,
        name: currentName,
        isComplete,
      } = tickets[index];

      setTicket({
        title,
        description,
        priority,
      });

      if (currentName !== user.name || isComplete) setDisable(true);
    }
  }, [tickets]);

  function addTask({ priority, title, description }: FieldValues) {
    const fullDate = new Date();
    const month = fullDate.toDateString().slice(4, 7);
    const date = `${month} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
    const minutes =
      fullDate.getMinutes() < 10
        ? `0${fullDate.getMinutes()}`
        : fullDate.getMinutes();
    const time = `${fullDate.getHours()}:${minutes}`;

    const ticketId = tickets.length + 1;
    const newTicket = {
      id: ticketId,
      name,
      details: { avatar, title, date: `Updated now` },
      date: { date, time },
      priority,
      timestamp: Date.now(),
      description,
      isDelete: false,
      isComplete: false,
    };

    dispatch(addTicket({ ticket: newTicket }));

    setDoc(doc(database, 'tickets', `${ticketId}`), newTicket);

    toast.success('Created successfully');

    navigate(`/tickets/${ticketId}`);
  }

  return (
    <>
      <Header title={ticket.title || 'New Ticket'} />

      <main css={ticketsStyles} className="theme">
        <h2 style={{ marginTop: 0 }}>Editing</h2>
        <Form
          addTask={addTask}
          title={ticket.title}
          description={ticket.description}
          priority={ticket.priority}
          disabled={disabled}
        />
        <Toaster />
      </main>
    </>
  );
}

export default Ticket;
