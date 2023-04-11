import { Outlet } from "react-router-dom";
import { Loading } from "./Loading";
import { useAuth } from "../../context/auth";

export function PrivateRoute() {
  const [auth] = useAuth();

  return auth.token ? <Outlet /> : <Loading />;
}
