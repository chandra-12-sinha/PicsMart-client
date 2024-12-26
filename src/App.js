import React, { useEffect, useRef } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import RequireUser from "./Components/RequireUser";
import Feed from "./Components/feed/Feed";
import Profile from "./Components/profile/Profile";
import UpdateProfile from "./Components/updateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import Isloggedin from "./Components/Isloggedin";

function App() {
  
  const isloading = useSelector((state) => state.appConfigReducer.isLoading);
  const loadingref = useRef(null);

  useEffect(() => {
    if (isloading) {
      loadingref.current?.continuousStart();
    } else {
      loadingref.current?.complete();
    }
  }, [isloading]);

  return (
    <>
      <LoadingBar height={4} color={"var(--accent-color)"} ref={loadingref} />
      <Routes>
        <Route element={<RequireUser />}>
          <Route element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/updateProfile" element={<UpdateProfile />} />
          </Route>
        </Route>

        <Route element={<Isloggedin />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
