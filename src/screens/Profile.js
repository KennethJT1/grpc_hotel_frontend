import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useAuth } from "../context/auth";

const { TabPane } = Tabs;
export const Profile = () => {
   //hook
   const [auth, setAuth] = useAuth();
  const user = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>IsAdmin: {user.isAdmin ? "yes" : "No"}</h1>
        </TabPane>
      </Tabs>
    </div>
  );
};
