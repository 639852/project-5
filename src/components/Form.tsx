/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { RootState } from '../store';
import { setComplete } from '../store/slices/ticketSlice';
import FormButtons from './FormButtons';

interface FormProps {
  addTask: ({ priority, title, description }: FieldValues) => void;
  title?: string;
  description?: string;
  priority?: string;
  disabled?: boolean;
}

function Form({ addTask, title, description, priority, disabled }: FormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const database = getFirestore();
  const { id } = useParams();
  const { dataBar } = useSelector((state: RootState) => state.barChart);
  const { isComplete } = useSelector(
    (state: RootState) => state.tickets.tickets[+(id || '') - 1] || false
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [priorityValue, setPriorityValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  async function getDate() {
    const fullDate = new Date();
    const date = fullDate.toDateString().slice(4);
    const time = fullDate.toTimeString().slice(0, 5);

    const response = await getDoc(doc(database, 'lastUpdate', 'fullDate'));
    const serverDate = response.data();
    const serverFullDate = new Date(serverDate?.date);

    const day = parseInt(serverDate?.date.slice(4), 10);
    const month = serverFullDate.getMonth();
    const year = serverFullDate.getFullYear();
    const currentDay = parseInt(date.slice(4), 10);
    const currentMonth = fullDate.getMonth();
    const currentYear = fullDate.getFullYear();

    const days = currentDay - day;
    const months = currentMonth - month;
    const isEqualYears = year === currentYear;

    setDoc(doc(database, 'lastUpdate', 'fullDate'), { date, time });

    return {
      days: days < 12 && isEqualYears && months < 2 ? days : 12,
      months,
      month,
      year,
    };
  }

  function getLastDay(year: number, month: number) {
    const date1 = new Date(year, month - 1, 31).getMonth();
    const date2 = new Date(year, month - 1, 30).getMonth();
    const date3 = new Date(year, month - 1, 29).getMonth();

    if (date1 === month) return 31;
    if (date2 === month) return 30;
    if (date3 === month) return 29;
    return 28;
  }

  function fillBars(days: number, key: string) {
    const newData = dataBar.slice(days);

    for (let i = 0; i < days; i++) {
      newData.push({ title: '0', High: 0, Normal: 0, Low: 0 });
    }

    newData[newData.length - 1] = {
      ...newData[newData.length - 1],
      [key]: 1,
    };

    for (let i = 0; i < newData.length; i++) {
      newData[i] = { ...newData[i], title: i < 9 ? `0${i + 1}` : `${i + 1}` };
    }

    return newData;
  }

  async function completeTicket() {
    const { days, months, month, year } = await getDate();

    const key =
      priority !== undefined
        ? priority[0].toUpperCase() + priority.slice(1)
        : '';

    if (months === 1) {
      const num = days + getLastDay(year, month);
      const d = num < 12 ? num : 12;
      const newData = fillBars(d, key);

      newData.forEach((bar) => {
        setDoc(doc(database, 'dataBar', `${bar.title}`), bar);
      });
    } else if (days !== 0) {
      const newData = fillBars(days, key);

      newData.forEach((bar) => {
        setDoc(doc(database, 'dataBar', `${bar.title}`), bar);
      });
    } else {
      updateDoc(doc(database, 'dataBar', '12'), {
        [key]: increment(1),
      });
    }

    dispatch(setComplete({ id, isComplete: true }));

    navigate('/tickets');
  }

  useEffect(() => {
    setPriorityValue(priority || '');
  }, [priority]);

  useEffect(() => {
    setTitleValue(title || '');
  }, [title]);

  useEffect(() => {
    setDescriptionValue(description || '');
  }, [description]);

  return (
    <FormControl
      component="form"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '24px 16px',
      }}
      onSubmit={handleSubmit(addTask)}
    >
      <TextField
        {...register('title', { required: true, maxLength: 50 })}
        type="text"
        label="Ticket Title *"
        value={titleValue}
        disabled={disabled}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      {errors?.title && (
        <p className="error" style={{ gridRow: 2 }}>
          This field is required!
        </p>
      )}
      <Select
        {...register('priority', { required: true })}
        label="Select Priority *"
        value={priorityValue}
        disabled={disabled}
        onChange={(e) => setPriorityValue(e.target.value)}
      >
        <MenuItem value="high">High</MenuItem>
        <MenuItem value="normal">Normal</MenuItem>
        <MenuItem value="low">Low</MenuItem>
      </Select>
      {errors?.priority && (
        <p className="error" style={{ gridColumn: 2 }}>
          This field is required!
        </p>
      )}
      <TextField
        {...register('description', { maxLength: 100 })}
        label="Description"
        value={descriptionValue}
        disabled={disabled}
        sx={{ gridColumn: '1/3' }}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
      {!disabled ? (
        <FormButtons
          completeTicket={completeTicket}
          errors={errors}
          id={id}
          title={titleValue}
          description={descriptionValue}
          priority={priorityValue}
        />
      ) : null}
      {isComplete ? (
        <h2 style={{ margin: 0, color: '#27ae60' }}>Completed</h2>
      ) : null}
    </FormControl>
  );
}

Form.defaultProps = {
  title: undefined,
  description: undefined,
  priority: undefined,
  disabled: false,
};

export default Form;
