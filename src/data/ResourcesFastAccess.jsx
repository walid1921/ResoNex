import { SiGmail } from "react-icons/si";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";

const ResourcesFastAccess = [
  {
    id: 1,
    icon: <BsGoogle size={25} />,
    name: "Google",
    path: "https://google.com",
  },
  {
    id: 2,
    icon: "/chatgpt-icon.png",
    name: "ChatGPT",
    path: "https://chatgpt.com",
  },
  {
    id: 3,
    icon: <FaGithub size={25} />,
    name: "GitHub",
    path: "https://github.com",
  },
  {
    id: 4,
    icon: <FaYoutube size={25} />,
    name: "Youtube",
    path: "https://youtube.com",
  },
  {
    id: 5,
    icon: <SiGmail size={25} />,
    name: "Gmail",
    path: "https://mail.google.com",
  },
  {
    id: 6,
    icon: <FaLinkedin size={25} />,
    name: "LinkedIn",
    path: "https://linkedin.com",
  },
  {
    id: 7,
    icon: <MdGTranslate size={25} />,
    name: "Translate",
    path: "https://translate.google.com",
  },
];

export default ResourcesFastAccess;
