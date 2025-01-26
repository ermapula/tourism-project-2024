import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";
import { baseURL } from "../api/initPublic";

export default function LocationCard({id, image, name, categories, rating, nav}) {
  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/locations/${id}`)}}>
        {
          image && 
          <CardMedia 
            component="img"
            image={image}
            alt={`${name} image`}
            sx={{aspectRatio: "16 / 9", objectPosition: "top"}}
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body" textTransform="capitalize">
            {(categories?.length != 0) && categories.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ) 
}
