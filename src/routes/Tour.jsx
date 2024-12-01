import { Button, Divider, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom"
import { CalendarMonth, Star } from "@mui/icons-material";
import { useEffect } from "react";

export default function Tour(params) {
  const logged = true;
  const { id } = useParams();

  const data = {
    image: "/tours/1.jpg",
    name: "Charyn Tour",
    agency: "Kaz Travel",
    dates: "Weekend",
    description: `Discover the stunning beauty of Charyn Canyon. Located just a few hours from Almaty, this tour offers breathtaking views, fascinating rock formations, and a chance to explore the famous Valley of Castles. Perfect for nature enthusiasts and adventure seekers, this day trip includes guided hikes, a picnic by the Charyn River, and plenty of photo opportunities.`,
    rating: 4.7,
  }

  useEffect(() => {
    document.title = data.name;
  }, [])

  return (
    <Stack
      className="main"
      divider={<Divider flexItem/>}
      spacing={2}
    >
      <div className="location-header">
        <img src={data.image} alt="" />
        <div className="tour-text">
          <Typography variant="h4" fontWeight="bold" paddingRight="40px">
            {data.name}
          </Typography>
          <Typography variant="overline">
            {data.agency}
          </Typography>
          <div>
            {data.description}
          </div>
          <Stack direction="row" alignItems="center" mt={1} gap={1}>
            <CalendarMonth />
            {data.dates}
          </Stack>
          <div className="tour-rating">
            <Star color="info" sx={{width: "16px", height: "16px"}} />
            {data.rating}
          </div>
          <Button 
            variant="contained" 
            sx={{marginTop: "20px", borderRadius: "20px", fontWeight: "bold"}}
            LinkComponent={Link}
            to={logged ? `/order/${id}` : "/login"}
            >
            Order ticket
          </Button>
        </div>
      </div>
      {/* TODO: Comment section */}
    </Stack>
  )
}
