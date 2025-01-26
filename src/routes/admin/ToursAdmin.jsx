import { Close, CloudUpload } from "@mui/icons-material";
import { Autocomplete, Box, Button, Chip, CircularProgress, IconButton, MenuItem, Modal, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createTour, deleteTour, getLocations, getTours, updateTour } from "../../api/admin";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";

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
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "locations",
    numeric: true,
    disablePadding: false,
    label: "Locations",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "max_participants",
    numeric: true,
    disablePadding: false,
    label: "Maximum Participants",
  },
  {
    id: "start_date",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "end_date",
    numeric: true,
    disablePadding: false,
    label: "End Date",
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
          Tours
        </Typography>
    </Toolbar>
  );
}

function ModalEditor(params) {
  function handleOpen() {
    params.setOpen(true)
    params.setMode(0)
    console.log("form:", params.formData)
  }
  function handleClose() {
    params.setOpen(false)
    params.setTourId(null)
    params.setFormData({
      title: "",
      locations: [],
      price: 0,
      description: "",
      status: "",
      max_participants: 0,
      start_date: null,
      end_date: null,
    })
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    params.setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log({photo: file})
    if(file.size > 1048576) {
      alert("Image is too large")
      return
    }
    params.setFormData(prev => ({
      ...prev,
      photo: file
    }))
  }

  function handleLocationSelect(e) {
    const id = e.target.value;
    if (!params.formData.locations.includes(id)) {
      params.setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, id],
      }))
    }
  }

  function handleLocationRemove(id) {
    params.setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter((i) => i !== id),
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    params.setLoading(true)
    const form = new FormData();
    form.append("title", params.formData.title);
    form.append("description", params.formData.description);
    form.append("price", params.formData.price);
    form.append("status", "available");
    form.append("max_participants", params.formData.max_participants);
    form.append("start_date", dayjs(params.formData.start_date).toISOString());
    form.append("end_date", dayjs(params.formData.end_date).toISOString());
    // if(params.formData.photo instanceof File) {
    //   form.append("photo", params.formData.photo);
    // }
    params.formData.locations.forEach(location => {
      form.append("locations", location);
    }); 
    if(params.mode) {
      updateTour(params.tourId, form)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => params.setLoading(false))
      } else {
        createTour(form)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => params.setLoading(false))
    }
    handleClose();
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>+Add new tour</Button>
      <Modal
        open={params.open}
        onClose={(e, reason) => {
          if(reason !== 'backdropClick') {
            handleClose()
          }
        }}
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
            <Typography variant="body">{params.mode ? 'Edit the tour' : 'Add a tour'}</Typography>
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
              label="Tour name"
              name="title"
              value={params.formData.title}
              onChange={handleChange}
              required
            /> 
            {/* <Box>
              {
                params.formData.photo && 
                <Box
                  component="img"
                  src={
                    params.formData.photo instanceof File ?
                    URL.createObjectURL(params.formData.photo) :
                    `${baseURL}/${params.formData.photo.split(":8000")[1]}` 
                  }
                  sx={{
                    maxWidth: "50%",
                    display: "block"
                  }}
                />
              }
              <Button
                variant="contained"
                component="label"
                sx={{ textTransform: "none" }}
              >
                Upload Tour Picture (&lsaquo;1Mb)
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box> */}
            {
              params.formData.locations.length !== 0 &&
              <Box>
                {
                params.formData.locations?.map((id) => {
                  const location = params.locations.find((l) => l.id === id);
                  return (
                    <Chip
                      key={`location-selected-${id}`}
                      label={location?.name}
                      onDelete={() => handleLocationRemove(id)}
                    />
                  );
                })
                }
              </Box>
            }
            <TextField
              select
              name="locations"
              label="Locations"
              value=""
              onChange={handleLocationSelect}
              slotProps={{select: { MenuProps: { slotProps: { paper: {sx: {maxHeight: "20rem"}}}}}}}
            >
              { 
                params.locations?.map((v) => (
                  <MenuItem key={`location-${v.id}`} value={v.id}>{v.name}</MenuItem>
                ))
              }
            </TextField>
            <TextField 
              type="number"
              label="Price, &#8376;"
              name="price"
              value={params.formData.price}
              onChange={handleChange}
              required
              onFocus={(e) => {e.target.select()}}
            /> 
            <TextField 
              type="number"
              label="Maximum participants"
              name="max_participants"
              value={params.formData.max_participants}
              onChange={handleChange}
              required
              onFocus={(e) => {e.target.select()}}
            /> 
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DateTimePicker 
                label="Start Date"
                name="start_date"
                value={params.formData.start_date}
                onChange={(v) => params.setFormData(prev =>({...prev, start_date: v}))}
                format="DD.MM.YYYY HH.mm"
                required
              /> 
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DateTimePicker 
                label="End Date"
                name="end_date"
                value={params.formData.end_date}
                onChange={(v) => params.setFormData(prev =>({...prev, end_date: v}))}
                format="DD.MM.YYYY HH.mm"
                required
              /> 
            </LocalizationProvider>
            <TextField 
              label="Description"
              name="description"
              value={params.formData.description}
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
    params.setLoading(true)
    deleteTour(params.id)
      .then(res => {
        params.update()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => params.setLoading(false))
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
            Delete tour {params.name}?
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

export default function ToursAdmin(params) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0)

  const [tourId, setTourId] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    locations: [],
    description: "",
    price: 0,
    status: "",
    max_participants: 0,
    start_date: null,
    end_date: null,
  });

  const [locations, setLocations] = useState([])

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
    getTours(link)
      .then((res) => {
        setData(res.results)
        setCount(res.count)
        setNext(res.next ? res.next.split(":8000")[1] : null)
        setPrev(res.previous ? res.previous.split(":8000")[1] : null)
        console.log("tours:", res)
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
  
  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res.results)
      })
      .catch(err => {
        console.log(err)
      })
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
    setTourId(data.id)
    setFormData({
      title: data.title || "",
      locations: [...data.locations],
      description: data.description || "",
      price: data.price || 0,
      status: data.status || "",
      max_participants: data.max_participants || 0,
      start_date: dayjs(data.start_date) || null,
      end_date: dayjs(data.end_date) || null,
    })
  }

  function handleDelete(id, name) {
    setDeleteId(id)
    setDeleteName(name)
    setConfirmOpen(true)
  }

  function getLocationsNames(ids) {
    return ids.map((id) => locations?.find((c) => c.id === id)?.name);
  }

  return (
    <>
      <ModalEditor 
        mode={mode} 
        setMode={setMode} 
        open={open} 
        setOpen={setOpen} 
        update={fetchData}
        tourId={tourId}
        setTourId={setTourId}
        formData={formData}
        setFormData={setFormData}
        setLoading={setLoading}
        locations={locations}
      />
      <ConfirmModal 
        open={confirmOpen}
        setOpen={setConfirmOpen}
        id={deleteId}
        setId={setDeleteId}
        name={deleteName}
        update={fetchData}
        setLoading={setLoading}
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
          <TableHeader />
          <TableBody>
            {data.map((row, i) => {
              
              return (
                <TableRow 
                  tabIndex={-1}
                  key={i}
                  sx={{ '&:hover': {bgcolor: "rgb(0, 0, 0, 0.1)"} }}
                >
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{getLocationsNames(row.locations)}</TableCell>
                  <TableCell align="right">&#8376;{row.price}</TableCell>
                  <TableCell align="right" sx={{maxWidth: "20rem"}}>{row.description}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.max_participants}</TableCell>
                  <TableCell align="right">{dayjs(row.start_date).format("DD MMMM, YYYY. HH:mm")}</TableCell>
                  <TableCell align="right">{dayjs(row.end_date).format("DD MMMM, YYYY. HH:mm")}</TableCell>
                  <TableCell align="right">
                      <Stack direction="row" justifyContent="end">
                        <Button variant="contained" onClick={() => {handleEditOpen(row)}} sx={{marginRight: 1}}>edit</Button>
                        <Button variant="contained" onClick={() => {handleDelete(row.id, row.title)}} color="error">delete</Button>
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
