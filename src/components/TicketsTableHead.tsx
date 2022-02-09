/* eslint-disable no-unused-vars */
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Order, Row } from '../store/slices/ticketSlice';

interface TicketsTableHeadProps {
  order: Order;
  setOrder: (order: Order) => void;
  orderBy: keyof Row;
  setOrderBy: (orderBy: keyof Row) => void;
}

function TicketsTableHead({
  order,
  setOrder,
  orderBy,
  setOrderBy,
}: TicketsTableHeadProps) {
  const handleRequestSort = (property: keyof Row) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableHead className="theme">
      <TableRow
        sx={{
          '> *:first-of-type': { paddingLeft: '32px' },
          '> *:last-of-type': { paddingRight: '32px' },

          '.MuiTableCell-root': {
            fontWeight: 700,
            color: 'var(--secondary-color-text)',
          },
        }}
      >
        <TableCell>Ticket details</TableCell>
        <TableCell>Owner name</TableCell>
        <TableCell sortDirection={orderBy === 'timestamp' ? order : false}>
          <TableSortLabel
            active={orderBy === 'timestamp'}
            direction={orderBy === 'timestamp' ? order : 'asc'}
            onClick={() => handleRequestSort('timestamp')}
          >
            Date
          </TableSortLabel>
        </TableCell>
        <TableCell sortDirection={orderBy === 'priority' ? order : false}>
          <TableSortLabel
            active={orderBy === 'priority'}
            direction={orderBy === 'priority' ? order : 'asc'}
            onClick={() => handleRequestSort('priority')}
          >
            Priority
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TicketsTableHead;
