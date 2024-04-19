import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");
  const [nullUser,setnullUser]=useState({});

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        blogs,
        setBlogs,
        mode,
        setMode,
        isAuthenticated,
        setIsAuthenticated,
        nullUser,
        setnullUser
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(

    <AppWrapper />
    

);