import { useDispatch, useSelector } from 'react-redux';
import { Chip } from '@mui/material';
import { Close, Delete, Done } from '@mui/icons-material';
import { removeTicket, Row, setDelete } from '../store/slices/ticketSlice';
import { RootState } from '../store';

function TicketsTableDelete({ row }: { row: Row }) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const setColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';

      case 'low':
        return 'warning';

      default:
        return 'success';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Chip
        color={setColor(row.priority)}
        label={row.priority}
        sx={{
          height: '26px',
          fontSize: '11px',
          textTransform: 'uppercase',
        }}
      />
      {row.name === user.name && !row.isDelete && !row.isComplete ? (
        <Delete
          sx={{
            position: 'absolute',
            right: 0,
            cursor: 'pointer',
          }}
          onClick={() => dispatch(setDelete({ id: row.id, isDelete: true }))}
        />
      ) : null}
      {row.isDelete ? (
        <div
          style={{
            position: 'absolute',
            right: '-16px',
            display: 'flex',
          }}
        >
          <Done
            sx={{ cursor: 'pointer' }}
            color="success"
            onClick={() => dispatch(removeTicket({ ...row }))}
          />
          <Close
            sx={{ cursor: 'pointer' }}
            color="error"
            onClick={() => dispatch(setDelete({ id: row.id, isDelete: false }))}
          />
        </div>
      ) : null}
    </div>
  );
}

export default TicketsTableDelete;
