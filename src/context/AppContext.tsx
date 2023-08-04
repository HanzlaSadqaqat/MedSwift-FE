import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface AppContextProps {
  loggedIn: boolean;
  email: string;
  userId: object;
  setLoggedIn: Dispatch<SetStateAction<boolean>> | null;
  setEmail: Dispatch<SetStateAction<string>> | null;
  setUserId: Dispatch<SetStateAction<object>> | null;
}

export let AppContextData = createContext<AppContextProps>({
  loggedIn: false,
  email: "",
  userId: {},
  setLoggedIn: null,
  setEmail: null,
  setUserId: null,
});

const AppContext = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState({});

  return (
    <AppContextData.Provider
      value={{
        loggedIn,
        email,
        userId,
        setEmail,
        setLoggedIn,
        setUserId,
      }}
    >
      {props.children}
    </AppContextData.Provider>
  );
};

export default AppContext;
