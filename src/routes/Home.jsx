import { useNavigate } from "react-router-dom"
import LocationCard from "../components/LocationCard"

export default function Home(params) {
  const nav = useNavigate();
  const locations = [
    {
      image: "charyn.jpg",
      name: "Charyn Canyon",
      agency: "Tour agency name",
      rating: 4.9,
    },
    {
      image: "charyn.jpg",
      name: "Charyn Canyon",
      agency: "Tour agency name",
      rating: 4.9,
    },
    {
      image: "charyn.jpg",
      name: "Charyn Canyon",
      agency: "Tour agency name",
      rating: 4.9,
    },
    {
      image: "charyn.jpg",
      name: "Charyn Canyon",
      agency: "Tour agency name",
      rating: 4.9,
    },
    {
      image: "charyn.jpg",
      name: "Charyn Canyon",
      agency: "Tour agency name",
      rating: 4.9,
    },
  ]

  return (
    <>
      <div className="main">
        <div className="card-grid">
          {locations.map((l, i) => (
            <LocationCard
              id={i}
              image={l.image} 
              name={l.name} 
              agency={l.agency} 
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
