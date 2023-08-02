import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationLayout } from "../components/registration/RegistrationLayout";
import axios, { AxiosError } from "axios";
import { AppContextData } from "../context/AppContext";
// import { AppContextData } from "../context/AppContext";

// import { data } from "autoprefixer";
export const Login: React.FC = () => {
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setEmail } = useContext(AppContextData);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      setLoggedIn!(true);
      setEmail!(email);
      navigate(`/`);
    } catch (error) {
      const err = error as AxiosError;
      const message = err.response?.data;
      if (message === "Please Verify Your Email Account!") {
        navigate(`/verification/${email}`);
      }

      setIsError(`${err.response?.data}`);
    }
  };

  return (
    <RegistrationLayout>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex text-primary justify-center font-bold relative bottom-10 text-3xl right-3">
          Login
        </div>

        <div className="flex justify-center items-center w-full">
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-5">
            <div className="relative flex flex-col justify-between">
              <input
                type="email"
                className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl"
                placeholder="Email"
                value={email}
                required
                name="email"
                autoComplete="email"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            <div className="relative flex flex-col justify-between">
              <input
                type="password"
                className="border-2 pl-10 border-black-300 w-72 p-1 max-w-3xl active:shadow-3xl"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            <div className="relative left-44 text-sm bottom-4 ">
              <Link
                to="/"
                className="underline hover:no-underline hover:text-primary transition"
              >
                Forget Password?
              </Link>
            </div>
            {isError ? (
              <div className="bg-red-200 text-red-950 flex justify-center p-1 text-center text-sm">
                {isError}
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-2 p-1 w-72 relative top-1 hover:bg-secondary transition duration-200 ease-out hover:ease-in hover:text-white font-bold"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="relative top-5">
          Don't have an account yet?
          <Link
            to="/signup"
            className="text-secondary hover:text-primary font-semibold"
          >
            {" Signup"}
          </Link>
        </div>
      </div>
    </RegistrationLayout>
  );
};
