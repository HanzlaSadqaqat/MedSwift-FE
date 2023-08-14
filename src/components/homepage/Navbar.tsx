import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContextData } from "../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCartShopping,
  faSignIn,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios";

interface NavbarProp {
  children: React.ReactNode;
  email?: string;
  price: number;
  itemNumber: number;
  newPrice: number | null;
}
interface ApiResponse {
  name: string;
  imageUrl: string;
  _id: object;
}

export const Navbar: React.FC<NavbarProp> = (props: NavbarProp) => {
  const { loggedIn, setLoggedIn, setUserId, userId } =
    useContext(AppContextData);
  const navigation = useNavigate();
  const [isToggle, setIsToggle] = useState(false);
  // const [data, setData] = useState<CartData[]>([]);
  const [result, setResult] = useState<ApiResponse>({
    name: "",
    imageUrl: "",
    _id: {},
  });
  const email = props.email;
  useEffect(() => {}, []);
  if (email) {
    useEffect(() => {
      getLoginDetails();
    }, [email]);
    useEffect(() => {
      localStorage.setItem("loginDetail", JSON.stringify(result));
      const data = localStorage.getItem("loginDetail");
      if (data) setUserId!(result._id);
    }, [result]);
    useEffect(() => {
      console.log(userId);
    }, [userId]);
  }
  const AddToCartButton = () => {
    navigation("/addtocart");
  };
  const getLoginDetails: any = async () => {
    try {
      const response = await axios.get(`/auth/login/details/${email}`);
      setResult(response.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  };
  const toggleOptions = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 h-16 border bg-white m-0 p-0 flex shadow-md justify-center z-10">
        <div id="navBar" className="flex justify-between w-11/12">
          <Link
            to="/"
            className="MEDSWIFT_LOGO flex items-center hover:scale-105"
          >
            <img
              src="../../public/images/medSwift logo.png"
              alt=""
              className="h-12"
            />
            <div className="text-green-500 font-extrabold text-2xl mx-1 flex items-center">
              MED
              <span className="text-blue-500">SWIFT</span>
            </div>
          </Link>

          <div className="flex gap-10 items-center">
            {loggedIn ? (
              <div className=" relative">
                <div className="flex items-center mr-20 ">
                  <div className="p-5 w-44">Hi, {result.name}</div>
                  <img
                    src={result?.imageUrl}
                    className="h-12 w-12 bg-slate-300 rounded-full hover:scale-105 relative shadow-xl"
                    alt=""
                    onClick={toggleOptions}
                  />
                </div>
                {isToggle && (
                  <div className="transition ease-out duration-300 m-2 top-20 absolute -right-5 w-full">
                    <div className="list-none pl-6 relative left-24 py-5 w-3/5 border shadow-2xl rounded-lg gap-4 flex flex-col bg-white">
                      <Link to="/profile" className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faUser} className="h-5" />
                        <li>Profile</li>
                      </Link>
                      <div className="border-b w-4/5  border-gray-300" />
                      <Link to="/dashboard" className="flex gap-3 items-center">
                        <FontAwesomeIcon icon={faAddressBook} className="h-5" />
                        <li>My Account</li>
                      </Link>
                      <div className="border-b w-4/5 border-gray-300" />
                      <Link
                        to="/"
                        onClick={() => setLoggedIn!(false as boolean)}
                        className="flex gap-3 items-center "
                      >
                        {/* <div className="before:content-[''] before:absolute w-10 before:h-10 before:bg-red"></div> */}
                        <FontAwesomeIcon icon={faSignOut} className="h-5" />
                        <li>Log Out</li>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="">
                  <Link to="/login">
                    <div className="border border-blue-400 transition-bg before:content-[''] z-0  px-5 py-2 rounded-3xl my-3 hover:text-white transition duration-200 items-center gap-2 overflow-hidden">
                      <div className="relative font-bold text-md z-10 flex gap-2 items-center ">
                        <FontAwesomeIcon icon={faSignIn} className="relative" />
                        <div>Log in</div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to="/signup">
                    <div className="border border-blue-400 transition-bg before:content-[''] z-0  px-5 py-2 rounded-3xl my-3  hover:text-white  transition duration-200 flex gap-2 items-center ">
                      <div className="flex gap-2 items-center">
                        <FontAwesomeIcon
                          icon={faSignOut}
                          className="h-5 relative"
                        />
                        <div className="relative">Sign up</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            <button
              // to="/addtocart"
              // params={{ subTotal: props.price, subQuantity: props.itemNumber }}
              onClick={AddToCartButton}
              className="relative flex bg-gray-200 text-gray-600  hover:bg-blue-400 hover:text-white duration-300  rounded-full text-2xl px-8 justify-between py-2  gap-3 items-center font-bold"
            >
              <div className="relative border-r-2 border-gray-500 pr-5">
                <FontAwesomeIcon icon={faCartShopping} />
                <div className="absolute right-1 text-xs bg-yellow-400 text-white rounded-full w-5 flex items-center justify-center h-5 -top-3">
                  {props.itemNumber}
                </div>
              </div>

              <div className="text-xl">
                ${props.newPrice === 0 ? props.price : props.newPrice}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};
