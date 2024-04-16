import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Blogs from "./components/pages/Blogs";
import SingleBlog from "./components/pages/SingleBlog";
import AllAuthors from "./components/pages/AllAuthors";
import About from "./components/pages/About";
import DashBoard from "./components/pages/DashBoard";
import UpdateBlog from "./components/pages/UpdateBlog";
import Navbar from "./components/layout/Navbar";
import { Flip, ToastContainer, Zoom } from "react-toastify";
import { Context } from "./main";
import { useContext } from "react";

const App = () => {
  const { mode } = useContext(Context);
  return (
    <>
     <ToastContainer
          position="bottom-center"
          autoClose={3000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={mode}
          transition:Zoom
        />
      <Router>
        <Navbar />
       
        <Routes>
          <Route element={<Home></Home>} path="/" />
          <Route element={<Register></Register>} path="/register" />
          <Route element={<Login></Login>} path="/login" />
          <Route element={<Blogs></Blogs>} path="/blogs" />
          <Route element={<SingleBlog></SingleBlog>} path="/blogs/:id" />
          <Route element={<AllAuthors></AllAuthors>} path="/authors" />
          <Route element={<About></About>} path="/about" />
          <Route element={<DashBoard></DashBoard>} path="/dashboard" />
          <Route element={<UpdateBlog></UpdateBlog>} path="/blog/update/:id" />
        </Routes>
      </Router>
    </>
  );
};

export default App;
