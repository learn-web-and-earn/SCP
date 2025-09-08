import LoadingBar from "@/components/custom/LoadingBar";
import ExploreLayout from "@/layouts/ExploreLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Explore from "@/pages/public/explore/Explore";
import Home from "@/pages/public/home/Home";
import CheckGuest from "@/utils/CheckGuest";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <ExploreLayout />,
    children: [
      {
        path: "/explore",
        element: (
          <Explore/>
        )
      },
    ],
  },
  {
    element: <MainLayout />, // Navbar is always here
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
        path: "/register",
        element: (
          <CheckGuest>
            <Register />
          </CheckGuest>
        ),
      },
      {
        path: "/login",
        element: (
          <CheckGuest>
            <Login />
          </CheckGuest>
        ),
      },
    ],
  },
]);

const AppRoutes = () => {

  const loading = useSelector((state) => state.auth.loading);

  return (
    <>
      <LoadingBar loading={loading} />
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AppRoutes;
