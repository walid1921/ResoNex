import { HiOutlineFolder } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SiGmail } from "react-icons/si";
import { FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { BsGoogle } from "react-icons/bs";

import {
  Briefcase,
  Brush,
  Database,
  Globe,
  GraduationCap,
  ImagePlus,
  LibraryBig,
  Maximize,
  MessageSquareText,
  Mic,
  Network,
  PenTool,
  PersonStanding,
  Sparkles,
  Star,
  Type,
  Wand2,
} from "lucide-react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

const resourcesFastAccess = [
  {
    id: 1,
    icon: <BsGoogle size={25} />,
    name: "Google",
    path: "https://google.com",
  },
  {
    id: 2,
    icon: "../../public/chatgpt-icon.png",
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

function Resources({ resourcesData, setResourcesData }) {
  return (
    <div className="flex flex-col gap-20  h-full">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <HiOutlineFolder size={25} />
          <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
            Resources
          </h2>
        </div>

        <ul className="flex gap-5 items-center">
          {resourcesFastAccess.map((resource) => (
            <TooltipComponent
              content={resource.name}
              position="TopCenter"
              offsetY={-5}
              animation={TooltipAnimation}
              key={resource.id}
            >
              <Link
                to={resource.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex border opacity-50 hover:opacity-100 border-[#ffffff] hover:border-white border-dashed rounded-full p-4 mx-auto transition-all ease-in-out duration-200 text-[#ffffff] hover:text-white"
              >
                {resource.name === "ChatGPT" ? (
                  <img src={resource.icon} alt="ChatGPT Logo" />
                ) : (
                  resource.icon
                )}
              </Link>
            </TooltipComponent>
          ))}
        </ul>
      </div>

      <ul className="flex justify-center flex-wrap gap-5">
        {resourcesData.map((resource) => (
          <li key={resource._id}>
            <Link to={resource.path}>
              <div className="flex flex-col justify-center items-center gap-6 w-[180px] h-[130px] bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] rounded-lg border border-slate-400 transition-all ease-in-out duration-300">
                {resource.icon === "Sparkles" && <Sparkles size={45} />}
                {resource.icon === "Star" && <Star size={45} />}
                {resource.icon === "Briefcase" && <Briefcase size={45} />}
                {resource.icon === "Brush" && <Brush size={45} />}
                {resource.icon === "Database" && <Database size={45} />}
                {resource.icon === "Globe" && <Globe size={45} />}
                {resource.icon === "GraduationCap" && (
                  <GraduationCap size={45} />
                )}
                {resource.icon === "ImagePlus" && <ImagePlus size={45} />}
                {resource.icon === "LibraryBig" && <LibraryBig size={45} />}
                {resource.icon === "Maximize" && <Maximize size={45} />}
                {resource.icon === "MessageSquareText" && (
                  <MessageSquareText size={45} />
                )}
                {resource.icon === "Mic" && <Mic size={45} />}
                {resource.icon === "Network" && <Network size={45} />}
                {resource.icon === "PenTool" && <PenTool size={45} />}
                {resource.icon === "PersonStanding" && (
                  <PersonStanding size={45} />
                )}
                {resource.icon === "Type" && <Type size={45} />}
                {resource.icon === "Wand2" && <Wand2 size={45} />}
                <span>{resource.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Resources;
