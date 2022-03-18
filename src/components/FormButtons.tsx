import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { editTicket, removeTicket, Row } from '../store/slices/ticketSlice';
import { RootState } from '../store';
import { getDataBar } from '../store/slices/barChartSlice';

interface FormButtonsProps {
  completeTicket: () => void;
  errors: object;
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  priority: string | undefined;
}

function FormButtons({
  completeTicket,
  errors,
  id,
  title,
  description,
  priority,
}: FormButtonsProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: ticketId } = useParams();
  const [numberOfErrors, setNumber] = useState(0);
  const [headerTitle, setTitle] = useState('');
  const { dataBar } = useSelector((state: RootState) => state.barChart);
  const database = getFirestore();

  const {
    tickets: { tickets },
    user: { name, avatar },
  } = useSelector((state: RootState) => state);

  function deleteTicket() {
    dispatch(removeTicket({ details: { title }, id: +(id || '') }));

    navigate('/tickets');
  }

  function changeTicket(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const fullDate = new Date();
    const month = fullDate.toDateString().slice(4, 7);
    const date = `${month} ${fullDate.getDate()}, ${fullDate.getFullYear()}`;
    const minutes =
      fullDate.getMinutes() < 10
        ? `0${fullDate.getMinutes()}`
        : fullDate.getMinutes();
    const time = `${fullDate.getHours()}:${minutes}`;
    const ticket = {
      id: +`${id}`,
      date: { date, time },
      name,
      details: {
        avatar,
        title,
        date: `Updated now`,
      },
      timestamp: Date.now(),
      description,
      priority,
    };

    dispatch(editTicket(ticket));
    setDoc(doc(database, 'tickets', `${id}`), ticket);

    navigate('/tickets');
  }

  function toggleButtons() {
    let toggle;

    if (ticketId !== undefined && tickets.length) {
      const index = tickets.findIndex((el: Row) => el.id === +ticketId);
      const { name: creatorName } = tickets[index];

      toggle = creatorName === name || headerTitle !== 'New Ticket';
    }

    return toggle;
  }

  useEffect(() => {
    setTitle(document.querySelector('header > h1')?.innerHTML || '');

    if (dataBar.length <= 1 && tickets.length > 0) dispatch(getDataBar());

    toggleButtons();
  }, [tickets]);

  useEffect(() => {
    setNumber(Object.keys(errors).length);
  }, [errors]);

  useEffect(() => {
    if (numberOfErrors) toast.error('Validation error');
  }, [numberOfErrors]);

  return (
    <div style={{ display: 'flex', gridColumn: '1/3' }}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ textTransform: 'none' }}
        onClick={toggleButtons() ? (e) => changeTicket(e) : undefined}
      >
        Save Details
      </Button>
      {toggleButtons() ? (
        <Button
          color="warning"
          variant="contained"
          size="large"
          sx={{ m: '0 auto 0 30px', textTransform: 'none' }}
          onClick={() => completeTicket()}
        >
          Complete
        </Button>
      ) : null}
      {toggleButtons() ? (
        <Button
          color="error"
          variant="contained"
          size="large"
          sx={{ textTransform: 'none' }}
          onClick={() => deleteTicket()}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
}

export default FormButtons;
