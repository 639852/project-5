/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { id } = useParams();
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

  function completeTicket() {
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
