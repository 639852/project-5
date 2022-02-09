import { ChangeEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { RootState } from '../store';
import { Order, Row } from '../store/slices/ticketSlice';
import TicketsTableHead from './TicketsTableHead';
import TicketsTableBody from './TicketsTableBody';
import TicketsGrid from './TicketsGrid';

function TicketsTable({ view }: { view: string }) {
  const { tickets } = useSelector((state: RootState) => state.tickets);

  const { headerSearchValue } = useSelector((state: RootState) => state.utils);

  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Row>('timestamp');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTickets = useMemo(() => {
    return [...tickets].filter((ticket: Row) =>
      ticket.details.title.toLowerCase().includes(headerSearchValue)
    );
  }, [headerSearchValue, tickets]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: 'calc(100% + 64px)', margin: '0 -32px', boxShadow: 0 }}
      >
        {view === 'table' ? (
          <Table sx={{ minWidth: 900, border: 0 }} aria-label="Ticket Table">
            <TicketsTableHead
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
            <TicketsTableBody
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              filteredTickets={filteredTickets}
            />
          </Table>
        ) : (
          <TicketsGrid
            page={page}
            rowsPerPage={rowsPerPage}
            tickets={tickets}
          />
        )}
        <Toaster />
        {!filteredTickets.length ? (
          <h2 style={{ textAlign: 'center', marginBottom: 0 }}>
            Tickets not found.
          </h2>
        ) : null}
      </TableContainer>
      {filteredTickets.length ? (
        <TablePagination
          rowsPerPageOptions={[1, 2, 3, 5, 8, 13, 21, 34, 55, 89]}
          component="div"
          count={tickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  );
}

export default TicketsTable;
