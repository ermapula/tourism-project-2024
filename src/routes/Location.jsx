import { Box, CircularProgress, Divider, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import TourCard from "../components/TourCard";
import { BookmarkBorder, Close, Place } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getCategory, getLocation } from "../api/location";
import { baseURL } from "../api/initPublic";
import { getTourByLocation } from "../api/tour";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";

export default function Location(params) {
  const [open, setOpen] = useState(false)
  const [loadingLoc, setLoadingLoc] = useState(false)
  const [loadingTour, setLoadingTour] = useState(false)
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null)
  const [categories, setCategories] = useState([])
  const [tours, setTours] = useState([])
  useEffect(() => {
    setLoadingLoc(true)
    getLocation(id)
    .then(res => {  
      setData(res)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setLoadingLoc(false)
    })
  }, [])
  
  useEffect(() => {
    if(data !== null) {
      data.categories.forEach(c => {
        getCategory(c)
          .then(res => {
            setCategories((prev) => {
              if(!prev.includes(res.name)) {
                return [...prev, res.name]
              }
              return prev;
            })
          })
      });
    }
  }, [data])

  useEffect(() => {
    if (data){
      document.title = data.name
    }
  }, [data])

  useEffect(() => {
    if(data) {
      setLoadingTour(true)
      getTourByLocation(data.name)
        .then(res => {
          setTours(res.results)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoadingTour(false)
        })
    }
  }, [data])
  return (
    <Stack
      className="main"
      divider={<Divider flexItem/>}
      spacing={2}
    >
      <>
      {
        loadingLoc && 
        <CircularProgress size="5rem" 
          sx={{
            position: "absolute", 
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} 
        />
      }
      {
        data &&
        <div className="location-header">
          {
            data.photo &&
            <img src={data.photo} alt={`Image of ${data.name}`} />
          }
          <div className="location-text">
            <Typography variant="h4" fontWeight="bold" >{data.name}</Typography>
            <Box  className="location-address" 
              
            >
              <Place color="error" />
              <Typography sx={{cursor: "pointer", textDecoration: "underline", "&:hover": {color: "darkblue"}}} onClick={() => {setOpen(true)}}>

                {data.address}
              </Typography>
            </Box>
            <Stack direction="row" alignItems="center" mb={2}>
              {
                categories && 
                <>
                  <BookmarkBorder />
                  {
                    categories.join(", ")
                  }
                </>
              }
            </Stack>
            <div>
              {data.description}
            </div>
          </div>
        </div>
      }
      {
        open &&
        <Box sx={{position: "relative"}}>
          <YMaps>
            <Map
              defaultState={{ center: data.address ? data.address.split(', ') : [43.25, 76.95], zoom: 10 }}
              width="100%"
              height="400px"
              
            >
              <Placemark geometry={data.address.split(', ')} />
              <ZoomControl />
            </Map>
          </YMaps>
          <IconButton onClick={() => setOpen(false)} sx={{position: "absolute", top:"0", right: "0"}}>
            <Close />
          </IconButton>
        </Box>
      }
      </>
      <>
      
      {
        
          loadingTour ?
          <CircularProgress size="5rem" 
          sx={{
            position: "absolute", 
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} 
        />
        :(
        tours.length > 0 ? (
          <>
            <Typography variant="h5" marginBottom="10px">
              Tours, that include this place:
            </Typography>
            <div className="card-grid">
              {tours.map((t) => (
                <TourCard
                  id={t.id}
                  // image={t.image} 
                  name={t.title} 
                  nav={nav}
                  key={`tour-${t.id}`}
                  price={t.price}
                />
              ))}
            </div>
          </>
        ) : (
          <Typography variant="h5" marginBottom="10px">
            No tours available at the moment
          </Typography>
        ))
      }
      
      </>
    </Stack>
  )
}
