import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface AppContextProps {
  loggedIn: boolean;
  email: string;
  userId: string;
  address: string;
  setLoggedIn: Dispatch<SetStateAction<boolean>> | null;
  setEmail: Dispatch<SetStateAction<string>> | null;
  setUserId: Dispatch<SetStateAction<string>> | null;
  setAddress: Dispatch<SetStateAction<string>> | null;
}

export let AppContextData = createContext<AppContextProps>({
  loggedIn: false,
  email: "",
  userId: "",
  address: "",
  setLoggedIn: null,
  setEmail: null,
  setUserId: null,
  setAddress: null,
});

const AppContext = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");

  return (
    <AppContextData.Provider
      value={{
        loggedIn,
        email,
        userId,
        address,
        setEmail,
        setLoggedIn,
        setUserId,
        setAddress,
      }}
    >
      {props.children}
    </AppContextData.Provider>
  );
};

export default AppContext;
