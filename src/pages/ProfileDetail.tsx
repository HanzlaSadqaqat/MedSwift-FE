import { useEffect, useContext, useState } from "react";
import { AppContextData } from "../context/AppContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
interface ApiResponse {
  imageUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

export default function ProfileDetail() {
  const { email } = useContext(AppContextData);
  const [result, setResult] = useState<ApiResponse>({
    imageUrl: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    userProfileDetail();
  }, []);
  const userProfileDetail = async () => {
    const response = await axios.get(`auth/login/details/${email}`);
    await setResult(response.data);
    console.log(result);
  };

  return (
    <div className="">
      <div className="container mx-auto py-8 px-4 flex justify-center h-screen items-center">
        <Link to={"/"}>
          <button className="flex justify-center items-center gap-1 m-5 absolute left-0 top-0">
            <FontAwesomeIcon icon={faArrowLeft} />
            HOME
          </button>
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-8 h-5/6">
          <div className="flex justify-end cursor-pointer">
            <FontAwesomeIcon
              icon={faEdit}
              className="hover:scale-150"
            ></FontAwesomeIcon>
          </div>
          <div className="flex items-center flex-col gap-6">
            <img
              src={result?.imageUrl}
              alt="User Profile"
              className="h-48 w-48 rounded-full object-cover"
            />
            <div className="ml-4 text-center ">
              <h1 className="text-2xl font-semibold">{result.name}</h1>
              <p className="text-gray-600">{result.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="text-gray-600">Phone: {result.phoneNumber}</p>
            <p className="text-gray-600">Address: {result.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
