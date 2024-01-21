import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";


export const Slider = ({ resourcesData, resourcesNum }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  return (
    <div className="overflow-hidden h-[160px] w-[917px]">
      <div className="embla__viewport h-[120px]" ref={emblaRef}>
        <div className="embla__container">
          {resourcesData
            .flatMap((resource) => resource.data)
            .map((data) => (
              <Link
                to={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="embla__slide relative flex items-center gap-2 bg-[rgba(148,163,184,0.26)] hover:bg-[rgba(58,111,240,0.2)] hover:border-[rgba(58,111,240,0.5)] rounded-lg border border-slate-400 transition-all ease-in-out duration-300 px-4 py-4 cursor-pointer mr-4"
                key={data._id} // Assuming you have a unique identifier for each data item
              >
                <img
                  className="h-12 w-12 rounded-full object-cover object-center"
                  src={data.logoUrl}
                  alt=""
                />
                <span className="mx-5">{data.name}</span>
              </Link>
            ))}
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          className="text-slate-400 hover:text-[#3a6df0] hover:border-[#3a6df0] transition-all ease-linear duration-200 p-1 border rounded-full border-slate-400"
          onClick={scrollPrev}
        >
          <HiChevronLeft size={25} />
        </button>
        <span className="text-sm flex items-center border py-1 px-3 rounded-md text-[#bbb] bg-[rgba(148,163,184,0.26)]">
          {resourcesNum}
        </span>
        <button
          className="text-slate-400 hover:text-[#3a6df0] hover:border-[#3a6df0] transition-all ease-linear duration-200 p-1 border rounded-full border-slate-400"
          onClick={scrollNext}
        >
          <HiChevronRight size={25} />
        </button>
      </div>
    </div>
  );
}

export default Slider;
