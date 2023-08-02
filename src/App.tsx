import { useContext } from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { AppContextData } from "./context/AppContext";
import { routes } from "./routes/Routes";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const { loggedIn } = useContext(AppContextData);
  return useRoutes(routes(loggedIn));
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
