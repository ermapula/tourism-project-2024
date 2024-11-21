import { Button, Divider, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom"
import { Star } from "@mui/icons-material";

export default function Tour(params) {
  const logged = false;
  const { id } = useParams();

  const data = {
    image: "/tours/charyn.jpg",
    name: "Charyn Tour",
    agency: "tour agency name",
    description: "Tour info: Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta a totam suscipit voluptatibus ducimus dolor, at dolores consequuntur non nesciunt exercitationem temporibus repellendus cumque natus, obcaecati praesentium, quae et voluptatum?",
    rating: 4.9,
  }

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
          <div className="tour-rating">
            <Star color="info" sx={{width: "16px", height: "16px"}} />
            {data.rating}
          </div>
          <Button 
            variant="contained" 
            sx={{marginTop: "20px", borderRadius: "20px", fontWeight: "bold"}}
            LinkComponent={Link}
            to={logged ? "/order" : "/login"}
            >
            Order ticket
          </Button>
        </div>
      </div>
      {/* TODO: Comment section */}
    </Stack>
  )
}
