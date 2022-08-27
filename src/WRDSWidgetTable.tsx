import React = require('react');
import { createRoot } from 'react-dom/client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

interface Props {
  requestor: any;
}

export const BasicTable: React.FC<Props> = ({ requestor }) => {
  const [columns, setColumns] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const fetchData = async () => {
      const guid = await requestor.getWrapperGuid();
      const dsInfo = await requestor.getInfo(guid);
      const columns = dsInfo.columnsInfo.map((c: any) => c.title);
      setColumns(columns);
      const values = await requestor.getValues({
        columnIndexes: columns.map((_: any, i: number) => i),
        wrapperGuid: guid.wrapperGuid,
        offset: 0,
        rowCount: dsInfo.rowCount
      });
      setRows(values.table);
    };
    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((name, i) => <TableCell key={i}>{name}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: string[], i: any) => (
              <TableRow
                key={i}
                hover
                role='checkbox'
                tabIndex={-1}
              >
                {row.map((r: string, i: number) => <TableCell key={i} align="right">{r}</TableCell>)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 500]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export class WRDSWidgetTable implements ExternalWRDSWidget {
  private requestor: any;

  setRequestor(requestor: any): void {
    this.requestor = requestor;
  }

  render(parent: HTMLElement) {
    createRoot(parent).render(<BasicTable requestor={this.requestor} />);
  }

  dispose(): void {
  }
}