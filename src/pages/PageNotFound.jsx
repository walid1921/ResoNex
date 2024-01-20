const PageNotFound = () => {
  return (
    <div className="page-notFound ">
      <div className=" text-center flex flex-col gap-6 px-6 py-6 border bg-[rgba(148,163,184,0.26)] border-[#3a6ff080] text-[#ffffff6f] rounded-md">
        <p className="text-3xl text-[#3A6DF0]">Page Not Found</p>
        <img src="../../public/undraw_page_not_found_re_e9o6.svg" alt="error-image" className=" h-[200px]" />
        <p>The page you are looking for might be in another dimension.</p>
      </div>
    </div>
  );
};

export default PageNotFound;
