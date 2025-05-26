import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({

  baseURL: "https://lab7-de612-default-rtdb.firebaseio.com/",

});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.params = {
        ...(config.params || {}),
        auth: token,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;