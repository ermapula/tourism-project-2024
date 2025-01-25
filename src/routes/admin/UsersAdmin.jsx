import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, MenuItem, Modal, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createManager, createUser, deleteUser, getUsers, updateUser } from "../../api/admin";

const headers = [
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
    width: "10px",
  },
  {
    id: "fname",
    numeric: true,
    disablePadding: false,
    label: "First name",
  },
  {
    id: "lname",
    numeric: true,
    disablePadding: false,
    label: "Last name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "gender",
    numeric: true,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone number",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
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
        Users
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
    params.setUserId(null)
    params.setFormData({
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      phone: "",
      role: "manager",
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
      updateUser(params.userId, params.formData)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      createManager(params.formData)
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
      <Button variant="contained" onClick={handleOpen}>+Add manager</Button>
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
            <Typography variant="body">{params.mode ? 'Edit the user' : 'Add a manager'}</Typography>
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
              label="First name"
              name="first_name"
              value={params.formData.first_name}
              onChange={handleChange}
              required
            /> 
            <TextField 
              label="Last name"
              name="last_name"
              value={params.formData.last_name}
              onChange={handleChange}
              required
            /> 
            <TextField 
              label="Email"
              name="email"
              value={params.formData.email}
              onChange={handleChange}
              required
            /> 
            <TextField 
              label="Password"
              name="password"
              type="password"
              value={params.formData.password}
              onChange={handleChange}
              required
            /> 
            
            <TextField
              select
              name="gender"
              label="Gender"
              value={params.formData.gender || ""}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
            <TextField 
              label="Phone number"
              name="phone"
              value={params.formData.phone}
              onChange={handleChange}
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
    params.setOpen(false)
  }
  function handleSubmit() {
    deleteUser(params.id)
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
            Delete user {params.email}?
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

export default function UsersAdmin(params) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0)
  const [userId, setUserId] = useState(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone: "",
    role: "manager",
  });
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [deleteEmail, setDeleteEmail] = useState(null)

  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [data, setData] = useState([])

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;


  async function fetchData(link) {
    setLoading(true)
    getUsers(link)
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
    setUserId(data.id)
    setFormData({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      email: data.email || "",
      gender: data.gender || "",
      phone: data.phone || "",
      role: data.role || "",
    })
  }

  function handleDelete(id, email) {
    setDeleteId(id)
    setDeleteEmail(email)
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
        userId={userId}
        setUserId={setUserId}
        formData={formData} 
        setFormData={setFormData} 
      />
      <ConfirmModal 
        open={confirmOpen}
        setOpen={setConfirmOpen}
        id={deleteId}
        email={deleteEmail}
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
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="end">
                      
                      <Button variant="contained" onClick={() => {handleDelete(row.id, row.email)}} color="error">delete</Button>
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
