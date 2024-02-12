import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import PrimaryBtn from "../ui/buttons/PrimaryBtn";
import SecondaryBtn from "../ui/buttons/SecondaryBtn";
import { FaLinkedin } from "react-icons/fa";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

const Login = () => {
  const [username, setUsername] = useState("walidka");
  const [password, setPassword] = useState("1234567");
  const [email, setEmail] = useState("");

  const [loginForm, setLoginForm] = useState(true);
  const [registerForm, setRegisterForm] = useState(false);

  const navigate = useNavigate();
  const { register, login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) login(username, password);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (username && password && email) register(username, password, email);
  }

  const handleLoginForm = () => {
    setLoginForm(true);
    setRegisterForm(false);
  };

  const handleRegisterForm = () => {
    setLoginForm(false);
    setRegisterForm(true);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative page-login flex items-center w-full">
      <nav className="z-20 absolute top-0 right-0 flex justify-between gap-20 pr-20 mt-5 h-20 items-center text-[#bbb] w-full">
        <img src="/logox.png" className="h-16 ml-10" alt="logo" />
        <div className="flex items-center gap-20">
          <ul className="flex items-center gap-10">
            <Link to={"/userGuide"}>
              <li className=" hover:text-white transition-all ease-in-out duration-200 cursor-pointer">
                USER GUIDE
              </li>
            </Link>
            <Link to={"/features"}>
              <li className=" hover:text-white transition-all ease-in-out duration-200 cursor-pointer">
                FEATURES
              </li>
            </Link>
            <Link to={"/about"}>
              <li className=" hover:text-white transition-all ease-in-out duration-200 cursor-pointer">
                ABOUT
              </li>
            </Link>
          </ul>
          <div className="flex gap-4">
            <PrimaryBtn text="Login" onClick={handleLoginForm} />
            <SecondaryBtn text="Register" onClick={handleRegisterForm} />
          </div>
        </div>
      </nav>
      <div className="login-bg flex flex-col justify-center">
        <div className="ml-20 w-[500px] flex flex-col gap-8 ">
          <p className="text-5xl leading-[60px] font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent animate-moveInLeft">
            FOCUS ON BEING PRODUCTIVE INSTEAD OF BUSY.
          </p>
          <span className="text-xl animate-moveInBottom">- Tim Ferris</span>
        </div>
      </div>

      {/* Login Form */}
      {loginForm && (
        <div className=" mr-40  flex flex-col justify-center items-center h-[50%] w-[60%] gap-12 border bg-[rgba(148,163,184,0.26)] border-[#3a6ff080] text-[#ffffff6f]  rounded-md">
          <div className="text-3xl flex items-center gap-4">
            <p className=" bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
              Sign in to{" "}
            </p>
            <img src="/ResoNex text.png" className="h-6" alt="logo text" />
          </div>

          <form
            className="flex flex-col items-center w-full"
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
              className="border text-white border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2 mt-5 w-[60%]"
              type="submit"
            >
              LogIn
            </button>
          </form>
        </div>
      )}

      {/* Register Form */}
      {registerForm && (
        <div className=" mr-40  flex flex-col justify-center items-center h-[50%] w-[60%] gap-12 border bg-[rgba(148,163,184,0.26)] border-[#3a6ff080] text-[#ffffff6f] rounded-md">
          <div className="text-3xl flex items-center gap-4">
            <p className=" bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
              Register to{" "}
            </p>
            <img src="/ResoNex text.png" className="h-6" alt="logo text" />
          </div>

          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleRegister}
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
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 rounded-md bg-transparent border border-slate-400  mt-2 w-[60%]"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="border text-white border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2 mt-5 w-[60%]"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      )}

      <TooltipComponent
        content="Creator LinkedIn"
        position="TopCenter"
        offsetY={-5}
        animation={TooltipAnimation}
        className="absolute bottom-6 right-6"
      >
        <Link
          to="https://www.linkedin.com/in/walid-kouider-ayad-487902218"
          target="_blank"
          rel="noopener noreferrer"
          className="flex border opacity-50 hover:opacity-100 border-[#ffffff] hover:border-white rounded-full p-3 mx-auto transition-all ease-in-out duration-200 text-[#ffffff] hover:text-white"
        >
          <FaLinkedin size={20} />
        </Link>
      </TooltipComponent>
    </div>
  );
};

export default Login;
