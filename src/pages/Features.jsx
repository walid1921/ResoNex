import React from "react";
import { HiArrowCircleLeft, HiCheckCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const featuresData = [
  {
    title: "Resources Storage",
    description:
      "Explore our expanding repository of +1000 design resources, regularly updated for the community. Easily store and manage your resources, files, and documents in a centralized location.",
  },
  {
    title: "Tasks Tracker",
    description:
      "Effortlessly track and manage your tasks to stay organized and focused on your priorities.",
  },
  {
    title: "To do List",
    description:
      "Keep track of your to-do items and stay organized with a simple and intuitive to-do list.",
  },
  {
    title: "Coding Tracker",
    description:
      "Keep track of your coding sessions, projects, and coding-related activities with ease.",
    status: "(Coming Soon)",
  },
  {
    title: "Calendar",
    description:
      "View and manage your schedule, events, and appointments in a convenient calendar interface.",
  },
  {
    title: "Jobs Tracker",
    description:
      "Track your job applications, interviews, and progress in your job search journey.",
    status: "(Coming Soon)",
  },
  {
    title: "Reminder",
    description:
      "Set reminders for important tasks, deadlines, and events to stay on top of your schedule.",
    status: "(Coming Soon)",
  },
];

function Features() {
  return (
    <div className="page-features  relative">
      <div className="flex justify-center items-center flex-col h-full">
        <Link
          to={"/login"}
          className="absolute top-8 left-8 hover:text-[#3a6df0] cursor-pointer text-[#e2e2e2]
          opacity-50 hover:opacity-100 transition-all ease-in-out duration-300"
        >
          <HiArrowCircleLeft size={40} />
        </Link>

        <h2 className="text-4xl font-semibold bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent animate-moveInTop">
          Features
        </h2>

        <ul className="grid grid-cols-2 gap-10 w-[90%] h-[70%] mt-14 justify-center animate-moveInLeft">
          {featuresData.map((feature, index) => (
            <li key={index} className="flex gap-4 mx-10">
              <div className="flex flex-col  gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-xl bg-gradient-to-r from-white to-[#a5a5a5] bg-clip-text text-transparent flex gap-2 ">
                    <HiCheckCircle size={25} color="#3a6ef0cb" />

                    {feature.title}
                  </h3>
                  <span className="text-sm text-[#bbb]">{feature.status}</span>
                </div>

                <p className="mt-1 text-[#bbb]">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Features;
