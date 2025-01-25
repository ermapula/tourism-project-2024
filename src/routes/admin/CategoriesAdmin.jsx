import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Modal, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../api/admin";

const headers = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
    width: "10px",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
]



function TableHeader(params) {
  return (
    <TableHead>
      <TableRow>
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
  return (
    <Toolbar
      sx={{
        mt: 2
      }}
      >
    
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Categories
      </Typography>
      
    </Toolbar>
  );
}

function ModalEditor(params) {
  
  function handleOpen() {
    params.setOpen(true)
    params.setMode(0)
  }
  function handleClose() {
    params.setOpen(false)
    params.setCategoryId(null)
    params.setFormData({
      name: ""
    })
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    params.setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(params.mode) {
      updateCategory(params.categoryId, params.formData)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      createCategory(params.formData)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
    }
    
    handleClose();
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>+Add</Button>
      <Modal
        open={params.open}
        onClose={handleClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="body">{params.mode ? 'Edit the category' : 'Add a category'}</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            gap={3}
          >
            <TextField 
              label="Name"
              name="name"
              value={params.formData.name}
              onChange={handleChange}
              required
            /> 
            <Stack direction="row" gap={2}>
              <Button variant="contained" type="submit">Confirm</Button>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

function ConfirmModal(params) {

  function handleClose() {
    params.setId(null)
    params.setOpen(false)
  }
  function handleSubmit() {
    deleteCategory(params.id)
      .then(res => {
        params.update()
      })
      .catch(err => {
        console.log(err)
      })
    handleClose()
  }

  return (
    <>
      <Modal
        open={params.open}
        onClose={handleClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            bgcolor: 'background.paper',
            boxShadow: 24,
            placeItems: "center",
            pt: 2,
            px: 4,
            pb: 3,
          }}
        >
          <Box mb={1}>
            Delete category {params.name}?
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error" onClick={handleSubmit}>Confirm</Button>
            <Button variant="contained" color="" onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

export default function CategoriesAdmin(params) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0)
  const [categoryId, setCategoryId] = useState(null)
  const [formData, setFormData] = useState({
    name: ""
  });
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [deleteName, setDeleteName] = useState(null)

  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [data, setData] = useState([])

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;


  async function fetchData(link) {
    setLoading(true)
    getCategories(link)
      .then((res) => {
        setData(res.results)
        setCount(res.count)
        setNext(res.next ? res.next.split(":8000")[1] : null)
        setPrev(res.previous ? res.previous.split(":8000")[1] : null)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData(null)
  }, [])

  
  async function handleChangePage(e, newPage) {
    if(newPage > page && next) {
      await fetchData(next)
    } else if(newPage < page && prev) {
      await fetchData(prev)
    }
    setPage(newPage);
  };

  function handleEditOpen(data) {
    setMode(1)
    setOpen(true)
    setCategoryId(data.id)
    setFormData({
      name: data.name || "",
    })
  }

  function handleDelete(id, name) {
    setDeleteId(id)
    setDeleteName(name)
    setConfirmOpen(true)
  }

  return (
    <>
      <ModalEditor 
        mode={mode} 
        setMode={setMode} 
        open={open} 
        setOpen={setOpen} 
        update={fetchData}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        formData={formData} 
        setFormData={setFormData} 
      />
      <ConfirmModal 
        open={confirmOpen}
        setOpen={setConfirmOpen}
        id={deleteId}
        setId={setDeleteId}
        name={deleteName}
        update={fetchData}
      />
      <Paper>
        {
          loading && 
          <CircularProgress size="5rem" 
            sx={{
              position: "absolute", 
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} 
          />
        }
        <TopToolBar />
        <Table>
          <TableHeader 
            rowCount={data.length}
          />
          <TableBody>
            {data.map((row, i) => {
              
              return (
                <TableRow 
                  
                  tabIndex={-1}
                  key={i}
                  sx={{ '&:hover': {bgcolor: "rgb(0, 0, 0, 0.1)"} }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="end">
                      <Button variant="contained" onClick={() => {handleEditOpen(row)}} sx={{marginRight: 1}}>edit</Button>
                      <Button variant="contained" onClick={() => {handleDelete(row.id, row.name)}} color="error">delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          nextIconButtonProps={{disabled: !next}}
          backIconButtonProps={{disabled: !prev}}
        />
      </Paper>
    </>
  ) 
}
