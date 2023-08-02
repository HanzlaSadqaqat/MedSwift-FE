import { Dispatch, SetStateAction, createContext, useState } from "react";

export interface AppContextProps {
  loggedIn: boolean;
  email: string;
  addProduct: number;
  setLoggedIn: Dispatch<SetStateAction<boolean>> | null;
  setEmail: Dispatch<SetStateAction<string>> | null;
  setAddProduct: Dispatch<SetStateAction<number>> | null;
}

export let AppContextData = createContext<AppContextProps>({
  loggedIn: false,
  email: "",
  addProduct: 0,
  setLoggedIn: null,
  setEmail: null,
  setAddProduct: null,
});

const AppContext = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [addProduct, setAddProduct] = useState(0);

  return (
    <AppContextData.Provider
      value={{
        loggedIn,
        email,
        addProduct,
        setEmail,
        setLoggedIn,
        setAddProduct,
      }}
    >
      {console.log(loggedIn)}
      {props.children}
    </AppContextData.Provider>
  );
};

export default AppContext;
