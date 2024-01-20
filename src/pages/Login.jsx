
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) login(username, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative page-login flex items-center w-full">
      <div className="login-bg flex flex-col justify-center">
        <div className="ml-40 w-[500px] flex flex-col gap-8 ">
          <div className=" z-10 mb-8">
            <img src="../../public/logo.png" className="h-20" alt="logo" />
          </div>
          <p className="text-5xl leading-[60px] font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent animate-moveInLeft">
            FOCUS ON BEING PRODUCTIVE INSTEAD OF BUSY.
          </p>
          <span className="text-xl animate-moveInBottom">- Tim Ferris</span>
        </div>
      </div>
      <div className=" mr-40  flex flex-col justify-center items-center h-[50%] w-[60%] gap-12 border bg-[rgba(148,163,184,0.26)] border-[#3a6ff080] text-[#ffffff6f] rounded-md">
        <div className="text-3xl flex gap-2">
          <p className=" bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
            Sign in to{" "}
          </p>
          <span className="text-[#3a6df0]">ResoNex</span>
        </div>

        <form
          className="flex flex-col gap-4 items-center w-full"
          onSubmit={handleSubmit}
        >
          <input
            className="p-2 rounded-md bg-transparent border border-slate-400  mt-2 w-[60%]"
            type="text"
            value={username}
            placeholder="Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-2 rounded-md bg-transparent border border-slate-400  mt-2 w-[60%]"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border text-white border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2 w-[60%]"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
