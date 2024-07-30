import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import UserProfile from "./pages/profile/UserProfile.tsx";
const user: string = localStorage.getItem("auth-token") || "";
const router = createBrowserRouter([
    {
        path: "/",
        element: user ? <App/>: <Login/>,
    },
    {
        path: "/login",
        element: user ? <App/>: <Login/>,
    },
    {
        path: "/register",
        element: user ? <App/>: <Register/>,
    },
    {
        path: "/profile/:id",
        element: user ? <UserProfile/>: <Login/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
