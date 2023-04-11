import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Loading } from "../components/Loading";
import swal from "sweetalert2";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const { TabPane } = Tabs;

//ADMIN Component
export const Admin = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const amAdmin = async () => {
    const admin = JSON.parse(localStorage.getItem("auth"));
    if (admin.user.role !== "ADMIN") {
      navigate("/hotels");
    }
  };

  useEffect(() => {
    amAdmin();
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Hotel" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

//ROOM Component
export const Rooms = () => {
  const [auth, setAuth] = useAuth();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const allBooking = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/hotels?limit=20`);
      setRooms(data.hotels);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    allBooking();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Rooms</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room.id}</td>
                    <td>{room.name}</td>
                    <td>{room.location}</td>
                    <td>{room.price}</td>
                    <td>{room.description}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//USER Component
export const Users = () => {
  const [auth, setAuth] = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const allUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users?limit=10`);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loading />}

        <table className="table table-bordered table-dark">
          <thead className="bs ">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>

          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === "ADMIN" ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//ADD ROOM Component
export const AddRoom = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //data
  const [name, setname] = useState();
  const [price, setPrice] = useState();
  const [description, setdescription] = useState();
  const [location, setLocation] = useState();
  const [imageurl, setimageurl] = useState("");

  const addRoom = async () => {
    const newRoom = {
      name,
      price,
      description,
      location,
      imageurl,
    };
    try {
      setLoading(true);
      const { data } = await axios.post(`/hotels`, newRoom);
      setLoading(false);
      swal
        .fire("Congratulations", "Your room has been created", "success")
        .then((result) => {
          navigate("/hotels");
        });
    } catch (error) {
      setLoading(false);
      swal.fire(" Hotel with that name already exists");
      setError(error.message);
    }
  };

  return (
    <div className="row">
      {loading && <Loading />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Room name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image url"
          value={imageurl}
          onChange={(e) => setimageurl(e.target.value)}
        />

        <div className="text-right">
          <button className="btn" onClick={addRoom}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};
