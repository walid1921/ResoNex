import { HiOutlineFolder } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
import AddResource from "../ui/buttons/AddResource";
import ResourceModal from "../ui/ResourceModal";

function Resources({ resourcesData, setResourcesData }) {
  
  

  return (
    <>
      <h2 className="text-2xl font-semibold flex items-center gap-3 mb-10 ">
        <HiOutlineFolder size={25} /> Resources
      </h2>
      <ul className="flex justify-center flex-wrap gap-5">
        {resourcesData.map((resource) => (
          <li key={resource._id}>
            <Link to={resource.path}>
              <div className="flex flex-col justify-center items-center gap-6 w-[200px] h-[150px] bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] hover:text-[#bbb] rounded-lg border border-slate-400 transition-all ease-in-out duration-300">
                {resource.icon === "Sparkles" && <Sparkles size={50} />}
                {resource.icon === "Star" && <Star size={50} />}
                {resource.icon === "Briefcase" && <Briefcase size={50} />}
                {resource.icon === "Brush" && <Brush size={50} />}
                {resource.icon === "Database" && <Database size={50} />}
                {resource.icon === "Globe" && <Globe size={50} />}
                {resource.icon === "GraduationCap" && (
                  <GraduationCap size={50} />
                )}
                {resource.icon === "ImagePlus" && <ImagePlus size={50} />}
                {resource.icon === "LibraryBig" && <LibraryBig size={50} />}
                {resource.icon === "Maximize" && <Maximize size={50} />}
                {resource.icon === "MessageSquareText" && (
                  <MessageSquareText size={50} />
                )}
                {resource.icon === "Mic" && <Mic size={50} />}
                {resource.icon === "Network" && <Network size={50} />}
                {resource.icon === "PenTool" && <PenTool size={50} />}
                {resource.icon === "PersonStanding" && (
                  <PersonStanding size={50} />
                )}
                {resource.icon === "Type" && <Type size={50} />}
                {resource.icon === "Wand2" && <Wand2 size={50} />}
                <span>{resource.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      

      {/* <ResourceModal
        closeAddResourceModal={closeAddResourceModal}
        openAddResourceModal={openAddResourceModal}
        folderId={folderId}
        onAddData={handleAddData}
      /> */}

      {/* <AddResource openAddResourceModal={openAddResourceModal} /> */}
    </>
  );
}

export default Resources;
