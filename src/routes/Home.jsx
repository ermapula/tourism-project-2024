import { useNavigate } from "react-router-dom"
import LocationCard from "../components/LocationCard"
import { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { getCategoriesAll, getLocations } from "../api/location";

function getCategoryNames(ids, categories) {
  return ids.map((id) => categories?.find((c) => c.id === id)?.name);
}

export default function Home(params) {
  const [locationsLoading, setLocationsLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  const [locations, setLocations] = useState(null);
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Home";
  }, [])
  useEffect(() => {
    setLocationsLoading(true)
    getLocations()
      .then(res => {
        setLocations(res.results)
        console.log("locations:", res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLocationsLoading(false)
      })
  }, [])

  useEffect(() => {
    setCategoriesLoading(true)
      getCategoriesAll()
       .then(res => {
         setCategories(res.results)
         console.log("categories:",res)
       })
       .catch(err => {
         console.log(err)
       })
       .finally(() => {
        setCategoriesLoading(false)
       })
   }, [])
  

  return (
    <>
      <div className="main">
        {
          categoriesLoading && 
          <CircularProgress size="1rem" />
        }
        {
          categories.length !== 0 &&
          <div className="categories">
            Categories:
            {
              categories.map((c) => (
                <Button variant="outlined" key={`category-${c.id}`} sx={{borderRadius: "20px"}}>{c.name}</Button>  
              ))
            }
          </div>
        }
        <div className="card-grid">
          {
            locationsLoading && 
            <CircularProgress size="5rem" 
              sx={{
                position: "absolute", 
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }} 
            />
          }
          {
            locations &&
            locations.map((l, i) => (
              <LocationCard
                id={l.id}
                image={l.photo} 
                name={l.name} 
                categories={getCategoryNames(l.categories, categories)}
                nav={nav}
                key={`location-${i}`}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}
