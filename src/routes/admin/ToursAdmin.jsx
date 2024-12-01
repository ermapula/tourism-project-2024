import { Close, CloudUpload, Delete } from "@mui/icons-material";
import { Autocomplete, Box, Button, Checkbox, IconButton, Modal, Paper, Stack, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
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
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "dates",
    numeric: true,
    disablePadding: false,
    label: "Dates",
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
        mt: 2
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
          Tours
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

function ModalEditor(params) {
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    description: "",
    price: 0,
    dates: "",
  });
  const [images, setImages] = useState([])
  const locations = [
     "Charyn Canyon",
     "Kolsay lakes",
     "Kayindy lakes",
     "Turkestan",
     "Astana",
  ];
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev,
      [name]: value 
    }));
  }

  function handleImages(e) {
    setImages([...images, e.target.files[0]])
    console.log(images)
  }

  function handleImageRemove(id) {
    let newImages = images.filter((_, i) => i !== id);
    console.log('filtered', newImages)
    setImages(newImages)
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(images){
      formData['image'] = images[0].name;
    }
    formData['id'] = params.id + 1;
    params.addTour(formData)
    handleClose();
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>+Add new tour</Button>
      <Modal
        open={open}
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
            <Typography variant="body">Add tour</Typography>
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            /> 
            <Box>
              <div>Tour cover images:</div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                sx={{textTransform: "none"}}
              >
                Upload Images
                <input
                  hidden
                  type="file"
                  onChange={handleImages}
                  multiple
                />
              </Button>
              <Stack>
                {images.map((im, id) => (
                  <Stack key={id} direction="row" alignItems="center">
                    <div>
                      {im.name}
                    </div>
                    <IconButton onClick={() => handleImageRemove(id)}>
                      <Close />
                    </IconButton>
                  </Stack>
                ))}
              </Stack>
            </Box>
            <Autocomplete 
              disablePortal
              options={locations}
              name="location"
              value={formData.location} 
              onChange={(e, v) => {
                setFormData(prev => ({
                  ...prev,
                  location: v
                }))
              }} 
              renderInput={(params) => 
              <TextField 
                {...params} 
                label="Location"
                required
              />}
              
            />
            <TextField 
              label="Tour Dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              required
            /> 
            <TextField 
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            /> 
            <TextField 
              type="number"
              label="Price"
              name="price"
              value={formData.price}
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

export default function ToursAdmin(params) {
  const [data, setData] = useState([{
    image: '1.jpg',
    id: 1,
    name: "Charyn Tour",
    location: "Charyn Canyon",
    price: 8000,
    dates: "Weekend",
    description: `Discover the stunning beauty of Charyn Canyon. Located just a few hours from Almaty, this tour offers breathtaking views, fascinating rock formations, and a chance to explore the famous Valley of Castles. Perfect for nature enthusiasts and adventure seekers, this day trip includes guided hikes, a picnic by the Charyn River, and plenty of photo opportunities.`,
  }])
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
    [data, page, rowsPerPage], 
  );

  function handleAddTour(d) {
    setData([...data, d])
  }
  
  return (
    <>
      <ModalEditor addTour={handleAddTour} id={data.length} />
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
                  <TableCell><Box component="img" src={`../tours/${row.image}`} width="150px" /></TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">&#8376;{row.price}</TableCell>
                  <TableCell align="right">{row.dates}</TableCell>
                  <TableCell align="right" sx={{width: "40%"}}>{row.description}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="end">
                      <Button variant="contained" sx={{marginRight: 1}}>edit</Button>
                      <Button variant="contained" color="error">delete</Button>
                    </Stack>
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
