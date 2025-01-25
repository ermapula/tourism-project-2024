import { Box, Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import TourCard from "../components/TourCard";
import { BookmarkBorder, Place } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getCategory, getLocation } from "../api/location";
import { baseURL } from "../api/initPublic";

export default function Location(params) {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null)
  const [categories, setCategories] = useState([])

  
  useEffect(() => {
    getLocation(id)
    .then(res => {  
      console.log(res)
      setData(res)
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
  const tours = [
    {
      image: "1.jpg",
      name: "Charyn Tour",
      agency: "Kaz Travel",
      rating: 4.7,
    }
  ]

  return (
    <Stack
      className="main"
      divider={<Divider flexItem/>}
      spacing={2}
    >
      {
        data &&
        <div className="location-header">
          {
            data.photo &&
            <img src={`${baseURL}/${data.photo.split(":8000")[1]}`} alt="" />
          }
          <div className="location-text">
            <Typography variant="h4" fontWeight="bold" >{data.name}</Typography>
            <div className="location-address">
              <Place color="error" />
              {data.address}
            </div>
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
        tours.length > 0 ? (
          <>
            <Typography variant="h5" marginBottom="10px">
              Tours, that include this place:
            </Typography>
            <div className="card-grid">
              {tours.map((t, i) => (
                <TourCard
                  id={i}
                  image={t.image} 
                  name={t.name} 
                  agency={t.agency} 
                  rating={t.rating} 
                  nav={nav}
                  key={i}
                />
              ))}
            </div>
          </>
        ) : (
          <Typography variant="h5" marginBottom="10px">
            No tours available at the moment
          </Typography>
        )
      }
    </Stack>
  )
}
