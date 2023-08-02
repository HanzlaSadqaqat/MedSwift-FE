import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegistrationLayout } from "../components/registration/RegistrationLayout";
import axios, { AxiosError } from "axios";

export const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let role;
      isSeller ? (role = "SELLER") : (role = "BUYER");
      await axios.post("auth/signup", {
        name,
        email,
        password,
        conformPassword,
        role,
      });
      navigate(`/verification/${email}`);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      setIsError(`${err.response?.data}`);
    }
  };

  return (
    <RegistrationLayout>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex text-primary justify-center font-bold relative bottom-5 text-3xl right-3">
          Signup
        </div>

        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-y-3  items-center"
          >
            {/* input Name */}
            <div className="relative flex  w-72">
              <input
                type="text"
                className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl"
                placeholder="Full Name"
                name="Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            {/* input Email */}
            <div className="relative flex flex-col justify-between">
              <input
                type="email"
                className="border-2 pl-10 w-72 border-black-300 p-1  max-w-3xl"
                placeholder="Email"
                name="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            {/* input Password */}
            <div className="relative flex flex-col justify-between">
              <input
                type="password"
                className="border-2 pl-10 border-black-300 w-72 p-1 max-w-3xl active:shadow-3xl"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            {/* Input Conform Password */}
            <div className="relative flex flex-col justify-between">
              <input
                type="password"
                className="border-2 pl-10 border-black-300 w-72 p-1 max-w-3xl active:shadow-3xl"
                placeholder="Confirm Password"
                name="Conform Password"
                value={conformPassword}
                required
                onChange={(e) => setConformPassword(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faKey}
                className="absolute left-3 top-2 text-gray-400"
              />
            </div>
            <div className="flex gap-4">
              Are you seller
              <input
                type="checkbox"
                checked={isSeller}
                onChange={() => setIsSeller(!isSeller)}
              />
            </div>
            {isError ? (
              <div className="flex justify-center">
                <div className="bg-red-200 text-red-950 flex justify-center p-1  text-center text-sm">
                  {isError}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="border-2 p-1 w-72 relative hover:bg-secondary transition duration-200 ease-out hover:ease-in hover:text-white font-bold"
              >
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className="relative top-5">
          Already have an account?
          <Link
            to="/login"
            className="text-secondary hover:text-primary font-semibold"
          >
            {" Login"}
          </Link>
        </div>
      </div>
    </RegistrationLayout>
  );
};
