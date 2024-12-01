import { Divider, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import TourCard from "../components/TourCard";
import { Place } from "@mui/icons-material";
import { useEffect } from "react";

export default function Location(params) {
  const { id } = useParams();
  const nav = useNavigate();

  const data = {
    image: "/locations/1.jpg",
    name: "Charyn Canyon",
    address: "Almaty Region",
    description: `Charyn Canyon (Шарын шатқалы) is a canyon on the Charyn River in Almaty region and is a part of the Charyn National Park. The canyon is roughly 154 km in length and features many formations formed by the weathering of sedimentary rock. This stunning geological formation is often referred to as the "Grand Canyon of Central Asia."`,
  }
  useEffect(() => {
    document.title = data.name;
  }, [])

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
      <div className="location-header">
        <img src={data.image} alt="" />
        <div className="location-text">
          <Typography variant="h4" fontWeight="bold" >{data.name}</Typography>
          <div className="location-address">
            <Place color="error" />
            {data.address}
          </div>
          <div>
            {data.description}
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </Stack>
  )
}
