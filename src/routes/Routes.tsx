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
import AddToCart from "../pages/AddToCart";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";

export const routes = (isLoggedIn: boolean) => {
  if (!isLoggedIn) {
    return [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/verification/:email", element: <VerificationCodePage /> },
      { path: "*", element: <Navigate to={"/"} /> },
      { path: "/addtocart", element: <AddToCart /> },
      { path: "/product/details", element: <ProductDetailPage /> },
      { path: "/orders", element: <Orders /> },

      { path: "/", element: <HomePage /> },
    ];
  } else {
    return [
      { path: "/profile/detail", element: <ProfileDetail /> },
      { path: "/orders", element: <Orders /> },
      { path: "/profile", element: <Profile /> },
      { path: "/", element: <HomePage /> },
      { path: "/medicine", element: <Medicine /> },
      { path: "/checkout", element: <Checkout /> },

      { path: "/product/details", element: <ProductDetailPage /> },

      { path: "/addtocart", element: <AddToCart /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "*", element: <Navigate to={"/"} /> },
      { path: "/inventory", element: <Inventory /> },
    ];
  }
};
