import { HiCheckCircle } from "react-icons/hi";

import featuresData from "../data/featuresData";
import GoBackButton from "../ui/buttons/GoBackButton";

function Features() {
  return (
    <div className="page-features  relative">
      <div className="flex justify-center items-center flex-col h-full">
        <GoBackButton />

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
