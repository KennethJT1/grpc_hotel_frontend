import React, { useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const login = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const { data } = await axios.post("users/signin", user);
      setLoading(false);

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data.user));
        setAuth({ ...auth, token: data.user.token, user: data.user.user });
        toast.success("Login successful");
        navigate(location.state || "/hotels");
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {error && <Error message="Login failed" />}
          <div className="bs">
            <h2>Login</h2>

            <input
              type="text"
              className="form-control"
              placeholder="email in small letters"
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
          </div>
          <button className="btn mt-3" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
