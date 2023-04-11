import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hotel } from "../components/Hotel";
import { Loading } from "../components/Loading";
import { useAuth } from "../context/auth";
import { Error } from "../components/Error";

export const HomeScreen = () => {
  //hook
  const [auth, setAuth] = useAuth();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();

  const [duplicateroom, setduplicateroom] = useState([]);

  const [searchKey, setSearchKey] = useState("");
  const [location, setLocation] = useState("");

  const getrooms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/hotels?limit=20`);
      setRooms(data.hotels);
      setduplicateroom(data.hotels);
      setLoading(false);
    } catch (error) {
      <Error />;
      console.log(error.message);
      setLoading(false);
    }
  };

  const filterBySearch = () => {
    const temproom = duplicateroom.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );

    setRooms(temproom);
  };

  const filterByLocation = (e) => {
    const temproom = duplicateroom.filter((room) =>
      room.location.toLowerCase().includes(location.toLowerCase())
    );

    setRooms(temproom);
  };

  useEffect(() => {
    getrooms();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : rooms ? (
        <div>
          {" "}
          <div className="row mt-5 bs">
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
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
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
                    <Hotel room={room} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <Error message="Could not load this page" />
      )}
    </div>
  );
};