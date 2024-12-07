import { useNavigate } from "react-router-dom"
import LocationCard from "../components/LocationCard"
import { useEffect } from "react";
import { Button } from "@mui/material";

export default function Home(params) {
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Home";
  }, [])
  

  const locations = [
    {
      id: 1,
      image: "1.jpg",
      name: "Charyn Canyon",
      type: "nature",
      rating: 4.7,
    },
    {
      id: 2,
      image: "2.jpg",
      name: "Kolsay lakes",
      type: "nature",
      rating: 4.9,
    },
    {
      id: 3,
      image: "3.jpg",
      name: "Kaindy lakes",
      type: "nature",
      rating: 4.6,
    },
    {
      id: 4,
      image: "4.jpg",
      name: "Turkestan",
      type: "historical",
      rating: 4.8,
    },
    {
      id: 5,
      image: "5.jpg",
      name: "Astana",
      type: "city",
      rating: 4.4,
    },
  ]
  const categories = [
    'Nature',
    'Historical',
    'Sight seeing',
    'City'
  ]

  return (
    <>
      <div className="main">
        <div className="categories">
          Categories:
          {
            categories.map((c, i) => (
              <Button variant="outlined" key={i} sx={{borderRadius: "20px"}}>{c}</Button>  
            ))
          }
        </div>
        <div className="card-grid">
          {locations.map((l, i) => (
            <LocationCard
              id={l.id}
              image={l.image} 
              name={l.name} 
              type={l.type}
              rating={l.rating} 
              nav={nav}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  )
}
