import { Close } from "@mui/icons-material";
import { Box, Button, Chip, CircularProgress, IconButton, MenuItem, Modal, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createLocation, deleteLocation, getCategoriesAll, getLocations, updateLocation } from "../../api/admin";
import { Map, Placemark, SearchControl, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { apiKey, baseURL } from "../../api/initPublic";

const regions = [
  "Abai Region",
  "Akmola Region",
  "Aktobe Region",
  "Almaty",
  "Almaty Region",
  "Astana",
  "Atyrau Region",
  "East Kazakhstan Region",
  "Jambyl Region",
  "Jetisu Region",
  "Karaganda Region",
  "Kostanay Region",
  "Kyzylorda Region",
  "Mangystau Region",
  "North Kazakhstan Region",
  "Pavlodar Region",
  "Shymkent",
  "Turkistan Region",
  "Ulytau Region",
  "West Kazakhstan Region",
];

const headers = [
  {
    id: "photo",
    numeric: false,
    disablePadding: false,
    label: "Image",
    width: "200px",
    permissionLevel: 0,
  },
  {
    id: "id",
    numeric: true,
    disablePadding: false,
    label: "Id",
    width: "10px",
    permissionLevel: 0,
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
    permissionLevel: 0,
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
    permissionLevel: 0,
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
    permissionLevel: 0,
  },
  {
    id: "region",
    numeric: false,
    disablePadding: false,
    label: "Region",
    permissionLevel: 0,
  },
  {
    id: "categories",
    numeric: false,
    disablePadding: false,
    label: "Categories",
    permissionLevel: 0,
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
    permissionLevel: 1,
  },
]

function coordsConvert(s) {
  if(s == "" || s == null || s == undefined) {
    return null
  }
  return s.split(', ').map(num => parseFloat(num))
}

function TableHeader(params) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((h) => 
        
        (
          (h.permissionLevel == 0 || h.permissionLevel == params.permission) &&
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
        Locations
      </Typography>
      
    </Toolbar>
  );
}

function ModalEditor(params) { 
  const [coordinates, setCoordinates] = useState(coordsConvert(params.formData.address) || null) 
  useEffect(() => {
    setCoordinates(coordsConvert(params.formData.address))
  }, [params.formData.address]) 
  function handleOpen() {
    params.setOpen(true)
    params.setMode(0)
    console.log("form:", params.formData)
  }
  function handleClose() {
    params.setOpen(false)
    params.setLocationId(null)
    params.setFormData({
      name: "",
      address: "",
      description: "",
      region: "",
      categories: [],
      photo: null,
    })
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    params.setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }))
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
  
  function handleCategorySelect(e) {
    const id = e.target.value;
    if (!params.formData.categories.includes(id)) {
      params.setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, id],
      }))
    }
  }

  function handleCategoryRemove(id) {
    params.setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((i) => i !== id),
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    params.setLoading(true)
    const form = new FormData();
    form.append("name", params.formData.name);
    form.append("description", params.formData.description);
    form.append("address", params.formData.address);
    form.append("region", params.formData.region);
    if(params.formData.photo instanceof File) {
      form.append("photo", params.formData.photo);
    }
    params.formData.categories.forEach(category => {
      form.append("categories", category);
    });
    if(params.mode) {
      updateLocation(params.locationId, form)
        .then(res => {
          params.update()
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => params.setLoading(false))
      } else {
        createLocation(form)
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

  async function handleMapClick(e) {
    const coords = e.get('coords');
    setCoordinates(coords)
    params.setFormData(prev => ({
      ...prev,
      address: coords.join(', ')
    }))
  };

  return (
    <>
      {
        params.permission == 1 && 
        <Button variant="contained" onClick={handleOpen}>+Add</Button>
      }
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
            width: "50rem",
            maxHeight: "90vh",
            bgcolor: 'background.paper',
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            overflowY: "scroll",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="body">{params.mode ? 'Edit the location' : 'Add a location'}</Typography>
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
            <Box>
              {
                params.formData.photo && 
                <Box
                  component="img"
                  src={
                    params.formData.photo instanceof File ?
                    URL.createObjectURL(params.formData.photo) :
                    params.formData.photo
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
                Upload Location Picture (&lsaquo;1Mb)
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            </Box>
            <TextField 
              label="Address"
              name="address"
              value={params.formData.address}
              onChange={handleChange}
              required
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            /> 
            <YMaps query={{ apikey: apiKey}}>
              <Map
                defaultState={{ center: coordinates ? coordinates : [43.25, 76.95], zoom: 10 }}
                width="100%"
                height="400px"
                onClick={handleMapClick}
              >
                <Placemark geometry={coordinates} />
                <SearchControl
                  options={{
                    float: 'left',
                    placeholderContent: 'Search for an address...',
                  }}
                  onResultSelect={(event) => {
                    const searchControl = event.originalEvent.target;
                    const selectedIndex = searchControl.getSelectedIndex();
                    if (selectedIndex !== -1) {
                      const selectedResult = searchControl.getResultsArray()[selectedIndex];
                      const resultCoordinates = selectedResult.geometry.getCoordinates();
                      setCoordinates(resultCoordinates)
                      params.setFormData(prev => ({
                        ...prev,
                        address: resultCoordinates.join(', ')
                      }))
                    }
                  }}
                />
                <ZoomControl />
              </Map>
            </YMaps>
            <TextField 
              label="Description"
              name="description"
              value={params.formData.description}
              multiline
              onChange={handleChange}
              required
              maxRows={10}
            /> 
            <TextField
              select
              name="region"
              label="Region"
              value={params.formData.region || ""}
              onChange={handleChange}
              slotProps={{select: { MenuProps: { slotProps: { paper: {sx: {maxHeight: "20rem"}}}}}}}
            >
              { 
                regions.map((v, i) => (
                  <MenuItem key={`region-${i}`} value={v}>{v}</MenuItem>
                ))
              }
            </TextField>
            {
              params.formData.categories.length !== 0 &&
              <Box>
                {
                params.formData.categories?.map((id) => {
                  const category = params.categories.find((c) => c.id === id);
                  return (
                    <Chip
                      key={`category-selected-${id}`}
                      label={category?.name}
                      onDelete={() => handleCategoryRemove(id)}
                    />
                  );
                })
                }
              </Box>
            }
            <TextField
              select
              name="categories"
              label="Categories"
              value=""
              onChange={handleCategorySelect}
              slotProps={{select: { MenuProps: { slotProps: { paper: {sx: {maxHeight: "20rem"}}}}}}}
            >
              { 
                params.categories?.map((v) => (
                  <MenuItem key={`category-${v.id}`} value={v.id}>{v.name}</MenuItem>
                ))
              }
            </TextField>
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
    deleteLocation(params.id)
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
            Delete location {params.name}?
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

export default function LocationsAdmin(params) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(0)
  const { permission } = useOutletContext();

  const [locationId, setLocationId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    region: "",
    categories: [],
    photo: null,
  });

  const [categories, setCategories] = useState(null);

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
    getLocations(link)
      .then((res) => {
        setData(res.results)
        setCount(res.count)
        setNext(res.next ? res.next : null)
        setPrev(res.previous ? res.previous : null)
        console.log("locations:", res)
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
    getCategoriesAll()
      .then(res => {
        setCategories(res.results)
        console.log("categories:",res)
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
    setLocationId(data.id)
    setFormData({
      name: data.name || "",
      address: data.address || "",
      description: data.description || "",
      region: data.region || "",
      categories: [...data.categories],
      photo: data.photo || null,
    })
  }

  function handleDelete(id, name) {
    setDeleteId(id)
    setDeleteName(name)
    setConfirmOpen(true)
  }

  function getCategoryNames(ids) {
    return ids.map((id) => categories?.find((c) => c.id === id)?.name);
  }

  return (
    <>
      <ModalEditor 
        mode={mode} 
        setMode={setMode} 
        open={open} 
        setOpen={setOpen} 
        update={fetchData}
        locationId={locationId}
        setLocationId={setLocationId}
        formData={formData} 
        setFormData={setFormData} 
        categories={categories}
        setLoading={setLoading}
        permission={permission}
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
          <TableHeader permission={permission} />
          <TableBody>
            {data.map((row, i) => {
              
              return (
                <TableRow 
                  tabIndex={-1}
                  key={i}
                  sx={{ '&:hover': {bgcolor: "rgb(0, 0, 0, 0.1)"} }}
                >
                  <TableCell>
                    {
                      row.photo &&
                      <Box component="img" src={row.photo} width="150px" />
                    }
                  </TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                  <Typography sx={{
                      maxWidth: "20rem",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}>
                      {row.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">{row.region}</TableCell>
                  <TableCell align="left">{getCategoryNames(row.categories).join(", ")}</TableCell>
                  {
                    (permission == 1) &&
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="end">
                        <Button variant="contained" onClick={() => {handleEditOpen(row)}} sx={{marginRight: 1}}>edit</Button>
                        <Button variant="contained" onClick={() => {handleDelete(row.id, row.name)}} color="error">delete</Button>
                      </Stack>
                    </TableCell>
                  }
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
