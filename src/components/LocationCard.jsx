import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

export default function LocationCard({id, image, name, agency, rating, nav}) {
  return (
    <Card className="location-card">
      <CardActionArea onClick={() => {nav(`/locations/${id}`)}}>
        <CardMedia 
          component="img"
          height="140"
          image={`/locations/${image}`}
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
