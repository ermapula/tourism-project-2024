import LocationCard from "../components/LocationCard"

export default function Home(params) {
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
        <div className="container">
          {locations.map((l, i) => (
            <LocationCard
              id={i}
              image={l.image} 
              name={l.name} 
              agency={l.agency} 
              rating={l.rating} 
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  )
}
