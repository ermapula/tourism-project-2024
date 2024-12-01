import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function TourCard({id, image, name, agency, rating, nav}) {

  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/tours/${id}`)}}>
        <CardMedia 
          component="img"
          image={`/tours/${image}`}
          sx={{aspectRatio: "16 / 9", objectPosition: "top"}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body">
            {agency}
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
