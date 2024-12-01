import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function LocationCard({id, image, name, type, rating, nav}) {
  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/locations/${id}`)}}>
        <CardMedia 
          component="img"
          image={`/locations/${image}`}
          sx={{aspectRatio: "16 / 9", objectPosition: "top"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body" textTransform="capitalize">
            {type}
          </Typography>
          <div className="location-rating">
            <span>
              <Star sx={{fontSize: 12}} />
            </span>
            {rating}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  ) 
}
