import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "logout":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unknown action`);
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        username,
        password,
      });

      const token = response.data.token; // the backend returns a token upon successful login

      console.log("token", token);

      // save the token in localStorage or a state management solution
      localStorage.setItem("token", token);

      // Set the token in axiosInstance immediately after saving to localStorage
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      dispatch({ type: "login", payload: { username, token } });
      toast.success(`Welcome back ${username.toLocaleLowerCase()}`);
    } catch (error) {
      console.error("Error logging in", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

        toast.error("Invalid username or password");
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        toast.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        toast.error("Error setting up the request.");
      }
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/register`, {
        username,
        password,
        email,
      });

      const token = response.data.token; // the backend returns a token upon successful login

      console.log("token", token);

      // save the token in localStorage or a state management solution
      localStorage.setItem("token", token);

      // Set the token in axiosInstance immediately after saving to localStorage
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      dispatch({ type: "login", payload: { username, token } });
      toast.success(`Welcome ${username.toLocaleLowerCase()}`);
    } catch (error) {
      console.error("Error registering", error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error setting up the request.");
      }
    }
  }

  const logout = () => {
    // remove the token from localStorage or state management solution
    localStorage.removeItem("token");

    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
