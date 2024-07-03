"use client"
import {
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
  IconButton, Paper, Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { deleteById } from '../services/apiService'
import { useEffect, useMemo, useState } from "react";

export default function CityTable({ cities, onEditData, onDeleteData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([])

  const styles = {
    table: {
      boxShadow: "0px 2px 2px gray",
      minWidth: 650,
      width: "100%"
    },
    container: {
      width: "100%"
    }
  }

  const deleteItem = async (id) => {
    onDeleteData(id)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginate = () => {
    const start = page * rowsPerPage
    const end = (page + 1) * rowsPerPage
    const paginated = cities.slice(start, end)
    setPaginatedData(paginated);
  }

  useEffect(paginate, [page, rowsPerPage, cities])

  return (
    <Box sx={styles.container}>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id </TableCell>
              <TableCell align="center">Municipio</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Valor pago mensal</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.phoneNumber}</TableCell>
                <TableCell align="center">{item.monthlyValue}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary" onClick={() => onEditData(item.id)}> <EditIcon /> </IconButton >
                  <IconButton aria-label="delete" color="error" onClick={() => deleteItem(item.id)}> <DeleteIcon /> </IconButton >
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={cities?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
