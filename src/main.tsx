import ReactDOM from "react-dom";
import App from "./App";
import AppContext from "./context/AppContext";
import axios from "axios";
import "./index.css";

const baseUrl = "http://localhost:8080/api";
axios.defaults.baseURL = baseUrl;

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById("root")
);
