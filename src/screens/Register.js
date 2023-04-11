import React, { useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { Success } from "../components/Success";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const register = async () => {
    if (password === cpassword) {
      try {
        setLoading(true);
        const { data } = await axios.post("/users/signup", {
          name,
          email,
          password,
          cpassword,
        });
        if (data?.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("auth", JSON.stringify(data.data));
          setAuth({ ...auth, token: data.data.token, user: data.data.user });
          toast.success("Registration successful");
          navigate("/login");
        }

        setLoading(false);
        setSuccess(true);
      } catch (error) {
        setLoading(false);
        setError(true);
        toast.error("Email already exist");
      }
    } else {
      toast.error("Password does not match");
    }
  };

  return (
    <div>
      {loading && <Loading />}
      {error && <Error message="Registration failed" />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration successful" />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
          <button className="btn mt-3" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};