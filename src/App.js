import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomeScreen } from "./screens/Homescreen";
import { Register } from "./screens/Register";
import { Login } from "./screens/Login";
import { Profile } from "./screens/Profile";
import { Admin } from "./screens/Admin";
import { LandingPage } from "./screens/LandingPage";

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Toaster position="top-right" />
        <Routes>
          <Route path="/hotels" exact element={<HomeScreen />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/profile" exact element={<Profile />} />
          <Route path="/admin" exact element={<Admin />} />
          <Route path="/" exact element={<LandingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
