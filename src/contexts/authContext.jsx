import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";

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
      const response = await axios.post(`http://localhost:5001/api/login`, {
        username,
        password,
      });

      const token = response.data.token; // the backend returns a token upon successful login

      // save the token in localStorage or a state management solution
      localStorage.setItem("token", token);

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

  const logout = () => {
    // remove the token from localStorage or state management solution
    localStorage.removeItem("token");

    dispatch({ type: "logout" });

  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
