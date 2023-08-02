// import React, { useContext } from "react";
// import { AppContextData } from "../context/AppContext";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContextData } from "../context/AppContext";
import LoaderSpinner from "../components/LoaderSpinner";

export const VerificationCodePage: React.FC = () => {
  const navigate = useNavigate();

  const [verificationCode, setCode] = useState("");
  const { email } = useParams();
  const { setLoggedIn } = useContext(AppContextData);
  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [isButtonDisable, setIsDisable] = useState(true);
  const [time, setTime] = useState(30);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    sendMessage();
  }, []);

  useEffect(() => {
    setHidden();
  }, []);
  useEffect(() => {
    setTimeInterval();
  }, []);

  ///////////////////////////////////////////////////////////////////////////Send verification Code
  const sendMessage = async () => {
    try {
      setIsLoading(true);
      await axios.post("/auth/send/verification", { email });
      setIsLoading(false);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
      setErrorMessage(`${err.response?.data}`);
      setIsLoading(false);
    }
  };
  ///////////////////////////////////////////////////////////////////////////verification Code
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verificationCode || verificationCode.length < 6)
      throw { code: 403, message: "invalid Code" };
    try {
      const response = await axios.post("auth/email/verify", {
        verificationCode,
        email,
      });
      console.log(response.data);
      setLoggedIn!(true || null);
      navigate("/");
      console.log(response);
    } catch (error) {
      const err = error as AxiosError;
      if (err.message === "User not found") console.log("now error");
      console.log(err.message);
    }
  };
  const btnLogin = () => {
    navigate("/");
  };

  const resendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage();
    if (!isLoading) {
      console.log("resend message");
      setTime(30);
      setIsHidden(false);
      setIsDisable(true);
      await setTimeInterval();
      await setHidden();
      await setTimeout(() => {
        setTime(30);
        setIsHidden(true);
        setIsDisable(false);
      }, 29000);
    }
  };
  const setHidden = async () => {
    await setTimeout(() => {
      if (isButtonDisable) {
        setIsDisable(!isButtonDisable);
        setIsHidden(!isHidden);
      }
    }, 30000);
  };
  const setTimeInterval = () => {
    const intervalID = setInterval(() => {
      setTime((count) => count - 1);
      if (!isButtonDisable) {
        console.log("time is zero");
        clearInterval(intervalID);
      }
    }, 1000);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-100 to-blue-400 h-screen flex justify-center items-center">
        <div className="w-2/4 h-4/6 bg-white rounded-md hover:shadow-2xl px-4">
          {isLoading ? <LoaderSpinner /> : " "}
          {ErrorMessage ? (
            <div className="flex justify-center center flex-col text-center h-full">
              <div>{/* <FontAwesomeIcon icon={fBadg} /> */}</div>
              <div className="py-5 text-2xl">{ErrorMessage}</div>
              <div>
                <button
                  onClick={btnLogin}
                  className="px-5 py-1 bg-primary text-white"
                >
                  Go Back
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex text-center flex-col gap-5 py-5">
                <div>
                  <FontAwesomeIcon
                    icon={faUserShield}
                    className="relative left-3 top-2 text-gray-700 h-28"
                  />
                </div>
                <div>
                  <strong className="text-2xl">Authenticate Your Email</strong>
                </div>

                <div>
                  Protecting your account is our top priority. Please confirm
                  your email by entering the authorization code send to your
                  email
                </div>
                <div className="">
                  <form action="" className="">
                    <input
                      type="text"
                      className="w-min-16 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-primary mb-4"
                      maxLength={6}
                      onChange={(e) => setCode(e.target.value)}
                      value={verificationCode}
                    />
                    <div className="flex flex-col items-end right-5">
                      <div
                        className="text-sm items-center right-24"
                        hidden={isHidden}
                      >
                        Resend After: {time}
                      </div>
                      <div className="flex gap-5">
                        <button
                          onClick={verifyCode}
                          className="border-2 px-5 py-1  relative top-1 rounded bg-primary hover:bg-white transition duration-200 ease-out hover:ease-in hover:text-black text-white font-bold"
                        >
                          Submit
                        </button>
                        {!isButtonDisable ? (
                          <button
                            onClick={resendCode}
                            disabled={isButtonDisable}
                            className="border-2 px-5 py-1 relative top-1 rounded hover:bg-primary transition duration-200 ease-out hover:ease-in hover:text-white font-bold"
                          >
                            Resend
                          </button>
                        ) : (
                          <button
                            className="border-2 px-5 py-1 cursor-not-allowed relative top-1 rounded bg-gray-300 text-white"
                            disabled={isButtonDisable}
                          >
                            Resend
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
