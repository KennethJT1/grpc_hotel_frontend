import React, { useState, useEffect } from "react";
import axios from "axios";
import { Room } from "../components/Room";
import { Loading } from "../components/Loading";
import { useAuth } from "../context/auth";
import { Error } from "../components/Error";

export const HomeScreen = () => {
  //hook
  const [auth, setAuth] = useAuth();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  // const [error, setError] = useState(false);

  //format date
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicateroom, setduplicateroom] = useState([]);

  //seacher and filtering
  const [searchKey, setSearchKey] = useState("");
  const [location, setLocation] = useState("");

  // Functionalities
  const getrooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/hotels?page=1&limit=20`);
      setRooms(data.hotels);
      setduplicateroom(data.hotels);
      setLoading(false);
    } catch (error) {
      // setError(true);
      <Error />
      console.log(error.message);
      setLoading(false);
    }
  };

  const filterBySearch = () => {
    //I can't filter the original room that's why l'm using duplicatrRoom
    const temproom = duplicateroom.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase()));

    setRooms(temproom);
  };

  const filterByLocation = (e) => {
    const temproom = duplicateroom.filter((room) =>
    room.location.toLowerCase().includes(location.toLowerCase()));

  setRooms(temproom);
  };

  useEffect(() => {
    getrooms();
  }, []);

  return (
    <div className="container">
      {loading ? (<Loading />): rooms ? (<div>    <div className="row mt-5 bs"> 

    {/* For searching */}
   <div className="col-md-6">
     <input
       type="text"
       className="form-control"
       placeholder="Search by name"
       value={searchKey}
       onChange={(e) => setSearchKey(e.target.value)}
       onKeyUp={filterBySearch}
     />
   </div>

   {/*  Filtering by Location */}
   <div className="col-md-6">
   <input
       type="text"
       className="form-control"
       placeholder="Search by location"
       value={location}
       onChange={(e) => {setLocation(e.target.value)}}
       onKeyUp={filterByLocation}
     />
   </div>
 </div>

 <div className="row justify-content-center mt-5">
   {loading ? (
     <Loading />
   ) : (
     rooms.map((room) => {
       return (
         <div className="col-md-9 mt-2">
           <Room room={room} fromdate={fromdate} todate={todate} />
         </div>
       );
     })
   )}
 </div></div>) : (
      <Error message="Could not load this page" />
      )}
   
    </div>
  );
};