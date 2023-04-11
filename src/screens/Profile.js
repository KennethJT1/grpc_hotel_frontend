import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const { TabPane } = Tabs;
export const Profile = () => {
  //hook
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const user = null || JSON.parse(localStorage.getItem("auth"));
  const myProfile = null || user.user;

  useEffect(() => {
    if (!auth) {
      navigate("/hotels");
      toast.error("You are not authorized to access this page. Please");
    } else {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {myProfile.name}</h1>
          <h1>Email: {myProfile.email}</h1>
          <h1>IsAdmin: {myProfile.role === "ADMIN" ? "YES" : "NO"}</h1>
        </TabPane>
      </Tabs>
    </div>
  );
};
