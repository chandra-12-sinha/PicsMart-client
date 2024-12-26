import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import "./Home.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyInfo } from "../../redux/slices/appConfigs";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default Home;
