import { HiOutlineFolder } from "react-icons/hi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
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

let TooltipAnimation = {
  open: { effect: "FadeIn", duration: 300, delay: 0 },
};

function ResourceCards({ resourcesFastAccess, resourcesData, isLoading }) {
  console.log(resourcesData);

  const resourcesNum =
    resourcesData &&
    resourcesData
      .map((resource) => resource.data.length)
      .reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <HiOutlineFolder size={25} />
          <h2 className="text-2xl font-semibold  bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent">
            {resourcesNum} Resources
          </h2>
        </div>

        <ul className="flex gap-5 items-center ">
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
      {/* w-[180px] h-[130px] */}
      {isLoading && <Spinner />}
      <ul className="flex justify-center flex-wrap gap-5 ">
        {resourcesData &&
          resourcesData.map((resource) => (
            <li key={resource._id}>
              <Link to={resource.path}>
                <div className="flex flex-col justify-center items-center gap-4 w-[160px] h-[115px]  bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] rounded-lg border border-slate-400 transition-all ease-in-out duration-300">
                  {resource.icon === "Sparkles" && <Sparkles size={40} />}
                  {resource.icon === "Star" && <Star size={40} />}
                  {resource.icon === "Briefcase" && <Briefcase size={40} />}
                  {resource.icon === "Brush" && <Brush size={40} />}
                  {resource.icon === "Database" && <Database size={40} />}
                  {resource.icon === "Globe" && <Globe size={40} />}
                  {resource.icon === "GraduationCap" && (
                    <GraduationCap size={40} />
                  )}
                  {resource.icon === "ImagePlus" && <ImagePlus size={40} />}
                  {resource.icon === "LibraryBig" && <LibraryBig size={40} />}
                  {resource.icon === "Maximize" && <Maximize size={40} />}
                  {resource.icon === "MessageSquareText" && (
                    <MessageSquareText size={40} />
                  )}
                  {resource.icon === "Mic" && <Mic size={40} />}
                  {resource.icon === "Network" && <Network size={40} />}
                  {resource.icon === "PenTool" && <PenTool size={40} />}
                  {resource.icon === "PersonStanding" && (
                    <PersonStanding size={40} />
                  )}
                  {resource.icon === "Type" && <Type size={40} />}
                  {resource.icon === "Wand2" && <Wand2 size={40} />}
                  <span className="text-center text-sm">{resource.name}</span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default ResourceCards;
