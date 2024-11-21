import { Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import TourCard from "../components/TourCard";
import { Place } from "@mui/icons-material";

export default function Location(params) {
  const { id } = useParams();

  const data = {
    image: "/locations/charyn.jpg",
  }

  const tours = [
    {
      image: "charyn.jpg",
      name: "Charyn Tour",
      agency: "Tour agency name",
      rating: 4.9,
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
          <Typography variant="h4" fontWeight="bold" >Place name</Typography>
          <div className="location-address">
            <Place color="error" />
            place address
          </div>
          <div>
            Place description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam alias omnis sit perferendis illo deleniti numquam id, hic suscipit harum libero aperiam eos, saepe ipsam tenetur? Aut culpa aliquam architecto?
          </div>
        </div>
      </div>
      <div>
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
              key={i}
            />
          ))}
        </div>
      </div>
    </Stack>
  )
}
