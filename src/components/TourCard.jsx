import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function TourCard({id, image, name, price, nav}) {

  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/tours/${id}`)}}>
        <CardMedia 
          component="img"
          image={image}
          alt={`Tour ${name}`}
          sx={{aspectRatio: "16 / 9", objectPosition: "top"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body">
            &#8376;{price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) 
}
