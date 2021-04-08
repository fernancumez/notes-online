import axios from "axios";
import config from "../config";

const clientAxios = axios.create({
  baseURL: config.REACT_APP_SERVER_URL,
});

export default clientAxios;
