function NoTasks() {
  return (
    <div className="h-[70%] flex justify-center items-center  ">
      <span className="text-md text-center font-light px-6 py-6 border bg-[rgba(148,163,184,0.26)] border-[rgba(58,111,240,0.5)] text-[#ffffff6f] rounded-md">
        No tasks found. <br />
        Start by adding new tasks.
      </span>
    </div>
  );
}

export default NoTasks;
