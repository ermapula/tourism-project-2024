import { Delete } from "@mui/icons-material";
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from "@mui/material";
import { useMemo, useState } from "react";

const headers = [
  {
    id: "image",
    numeric: false,
    disablePadding: true,
    label: "Image",
    width: "200px",
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
    width: "10px",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "address",
    numeric: true,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
]

const data = [
  {
    image: '../locations/charyn.jpg',
    id: 1,
    name: "name",
    address: "address",
    description: "asdfasdf",
  },
  {
    image: '../locations/charyn.jpg',
    id: 2,
    name: "name",
    address: "address",
    description: "asdfasdf",
  },
  {
    image: '../locations/charyn.jpg',
    id: 3,
    name: "name",
    address: "address",
    description: "asdfasdf",
  },
]

function TableHeader(params) {
  const { numSelected, rowCount, onSelectAllClick } = params;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headers.map((h) => (
          <TableCell
            key={h.id}
            align={h.numeric ? 'right' : 'left'}
            padding={h.disablePadding ? 'none' : 'normal'}
            sx={{
              fontWeight: "bold",
              width: h.width && h.width, 
            }}
          >
            {h.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

function TopToolBar(params) {
  const { numSelected } = params;
  return (
    <Toolbar
      sx={{
        bgcolor: numSelected > 0 && "var(--light-blue)",
      }}
      >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Locations
        </Typography>
      )}
      <Tooltip title="Delete">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function LocationsAdmin(params) {
  const [selected, setSelected] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handleSelectAll(e) {
    if (e.target.checked) {
      const elem = data.map((d) => d.id);
      setSelected(elem);
      return;
    }
    setSelected([]);
  }

  function handleClick(e, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  function handleChangePage(e, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(e) {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const rows = useMemo(() =>
    [...data].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage], 
  );
  
  return (
    <>
      <Paper>
        <TopToolBar numSelected={selected.length} />
        <Table>
          <TableHeader 
            onSelectAllClick={handleSelectAll} 
            rowCount={data.length}
            numSelected={selected.length}
          />
          <TableBody>
            {rows.map((row, i) => {
              const isItemSelected = selected.includes(row.id);
              const labelId = `enhanced-table-checkbox-${i}`;
              
              return (
                <TableRow 
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={i}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox 
                      onClick={(event) => handleClick(event, row.id)}
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell><Box component="img" src={row.image} width="150px" /></TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" sx={{marginRight: 1}}>edit</Button>
                    <Button variant="contained" color="error">delete</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  ) 
}
