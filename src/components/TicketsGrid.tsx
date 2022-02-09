/** @jsxImportSource @emotion/react */
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Row } from '../store/slices/ticketSlice';
import {
  ticketsContainerStyles,
  ticketsItemStyles,
  ticketsProfileStyles,
} from '../style';
import TicketsTableDelete from './TicketsTableDelete';

interface TicketTableBodyProps {
  page: number;
  rowsPerPage: number;
  tickets: Row[];
}

function getComparator(a: Row, b: Row) {
  if (b.timestamp < a.timestamp) return 1;
  if (b.timestamp > a.timestamp) return -1;
  return 0;
}

function TicketsGrid({ page, rowsPerPage, tickets }: TicketTableBodyProps) {
  return (
    <div css={ticketsContainerStyles}>
      {[...tickets]
        .sort((a, b) => getComparator(a, b))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <div
            key={row.id}
            css={ticketsItemStyles}
            className={`${row.isComplete ? 'complete' : undefined} gridItem`}
          >
            <div>
              <p>{row.date.date}</p>
              <p className="date">{row.date.time}</p>
            </div>
            <TicketsTableDelete row={row} />
            <div style={{ gridColumn: '1/3' }}>
              <Link to={`/tickets/${row.id}`}>{row.details.title}</Link>
              <p className="date">{row.details.date}</p>
            </div>
            <div css={ticketsProfileStyles} className="grid">
              <Avatar
                src={row.details.avatar || undefined}
                alt="Avatar"
                sx={{ gridRow: '1/3' }}
              />
              <p>{row.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TicketsGrid;
