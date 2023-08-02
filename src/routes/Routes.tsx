import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/Signup";
import { HomePage } from "../pages/HomePage";
import { VerificationCodePage } from "../pages/VerificationCodePage";
import { Medicine } from "../pages/Medicine";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import ProductDetailPage from "../pages/ProductDetailPage";
import { Profile } from "../pages/Profile";
import ProfileDetail from "../pages/ProfileDetail";

export const routes = (isLoggedIn: boolean) => {
  if (!isLoggedIn) {
    return [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/verification/:email", element: <VerificationCodePage /> },
      { path: "*", element: <Navigate to={"/"} /> },
      { path: "/", element: <HomePage /> },
      { path: "/product/detail/page", element: <ProductDetailPage /> },
    ];
  } else {
    return [
      { path: "/profile/detail", element: <ProfileDetail /> },
      { path: "/profile", element: <Profile /> },
      { path: "/", element: <HomePage /> },
      { path: "/medicine", element: <Medicine /> },
      { path: "/product/detail/page", element: <ProductDetailPage /> },

      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <Navigate to={"/"} /> },
      { path: "/inventory", element: <Inventory /> },
    ];
  }
};
