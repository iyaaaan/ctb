import axios from "axios";
import config from "../../config";

const storageToken = localStorage.getItem("authToken");
axios.defaults.baseURL = config().BASE_API_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${
  storageToken ? storageToken : ""
}`;

export default axios;
