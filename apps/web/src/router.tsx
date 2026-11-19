import { createBrowserRouter, Navigate } from "react-router";
import Home from "@/features/home";
import HomeLayout from "@layouts/home";
import SignIn from "@/features/auth/signin";
import SignUp from "@/features/auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

export default router;
