/** @jsxImportSource @emotion/react */
import { Avatar, TableBody, TableCell, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Order, Row } from '../store/slices/ticketSlice';
import { tableRowStyles, ticketsProfileStyles } from '../style';
import TicketsTableDelete from './TicketsTableDelete';

interface TicketTableBodyProps {
  order: Order;
  orderBy: keyof Row;
  page: number;
  rowsPerPage: number;
  filteredTickets: Row[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator<Key extends keyof Row>(order: Order, orderBy: Key) {
  return order === 'desc'
    ? (a: Row, b: Row) => descendingComparator<Row>(a, b, orderBy)
    : (a: Row, b: Row) => -descendingComparator<Row>(a, b, orderBy);
}

function TicketsTableBody({
  order,
  orderBy,
  page,
  rowsPerPage,
  filteredTickets,
}: TicketTableBodyProps) {
  return (
    <TableBody className="theme">
      {filteredTickets
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            key={row.id}
            css={tableRowStyles}
            className={row.isComplete ? 'complete' : undefined}
          >
            <TableCell>
              <div css={ticketsProfileStyles}>
                <Avatar
                  src={row.details.avatar || undefined}
                  alt="Avatar"
                  sx={{ gridRow: '1/3' }}
                />
                <Link to={`/tickets/${row.id}`}>{row.details.title}</Link>
                <p className="date">{row.details.date}</p>
              </div>
            </TableCell>
            <TableCell sx={{ verticalAlign: 'top' }}>{row.name}</TableCell>
            <TableCell>
              <p>{row.date.date}</p>
              <p className="date">{row.date.time}</p>
            </TableCell>
            <TableCell>
              <TicketsTableDelete row={row} />
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
}

export default TicketsTableBody;
