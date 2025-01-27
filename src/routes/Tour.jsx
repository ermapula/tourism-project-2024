import { Button, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom"
import { CalendarMonth, Groups, Star } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import Comment from "../components/Comment";
import { AuthContext } from "./auth/AuthContext";
import { getTour } from "../api/tour";
import { getLocation } from "../api/location";
import dayjs from "dayjs";

export default function Tour(params) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [loadingTour, setLoadingTour] = useState(false)
  const [loadingLoc, setLoadingLoc] = useState(false)

  
  const [data, setData] = useState(null)
  const [locations, setLocations] = useState([])


  useEffect(() => {
    setLoadingTour(true)
    getTour(id)
      .then(res => {
        setData(res)
        setData(prev => ({
          ...prev,
           start_date: dayjs(prev.start_date),
           end_date: dayjs(prev.end_date),
        })) 
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoadingTour(false)
      })
  }, [])

  useEffect(() => {
    if(data !== null) {
      setLoadingLoc(true)
      data.locations.forEach(c => {
        getLocation(c)
          .then(res => {
            setLocations((prev) => {
              if(!prev.includes(res.name)) {
                return [...prev, res.name]
              }
              return prev;
            })
          })
      });
      setLoadingLoc(false)
    }
  }, [data])

  useEffect(() => {
    if(data){
      document.title = data.title;
    }
  }, [data])

  return (
    <Stack
      className="main"
      divider={<Divider flexItem/>}
      spacing={2}
    >
      <>
      {
        loadingTour && 
        <CircularProgress size="5rem" 
          sx={{
            position: "absolute", 
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }} 
        />
      }
      {
        data &&
      <div className="location-header">
        <img src={data.photo} alt={`Tour ${data.title} image`} />
        <div className="tour-text">
          <Typography variant="h4" fontWeight="bold" paddingRight="40px">
            {data.title}
          </Typography>
          <Typography component="div" sx={{fontSize: "1.5rem"}}>
            {
              loadingLoc  
              ? <CircularProgress size="1rem" />
              : locations.join(", ")
            }
          </Typography>
          <div>
            {data.description}
          </div>
          <Stack direction="row" alignItems="center" mt={1} gap={1}>
            <CalendarMonth />
            <span>Starts at:</span>
            {dayjs(data.start_date).format("DD MMMM, YYYY. HH:mm")}
          </Stack>
          <Stack direction="row" alignItems="center" mt={1} gap={1}>
            <CalendarMonth />
            <span>Ends at:</span>
            {dayjs(data.end_date).format("DD MMMM, YYYY. HH:mm")}
          </Stack>
          <Stack direction="row" alignItems="center" mt={1} gap={1}>
            <Groups />
            <span>Maximum participants:</span>
            {data.max_participants}
          </Stack>
          <Typography component="div" variant="overline" fontSize="1rem">
            {data.status}
          </Typography>
          
          <Button 
            variant="contained" 
            sx={{ borderRadius: "20px", fontWeight: "bold"}}
            LinkComponent={Link}
            to={user ? `/order/${data.id}` : "/login"}
            disabled={data.status != "available"}
          >
            Order ticket
          </Button>
        </div>
      </div>
      }
      </>
      {/* <div>
        <Comment />
      </div> */}
    </Stack>
  )
}
