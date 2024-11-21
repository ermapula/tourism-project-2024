import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Star } from "@mui/icons-material";

export default function TourCard({id, image, name, agency, rating}) {
  const nav = useNavigate();

  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/tours/${id}`)}}>
        <CardMedia 
          component="img"
          height="140"
          image={`/tours/${image}`}
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
