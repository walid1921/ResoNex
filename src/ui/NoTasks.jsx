function NoTasks({
  text = "No tasks found. Start by adding new tasks.",
  bg = "bg-[rgba(148,163,184,0.26)]",
  border = "border-[rgba(58,111,240,0.5)]",
}) {
  return (
    <div className="h-[70%] flex justify-center items-center  ">
      <span
        className={`text-md text-center font-light px-6 py-6 border ${bg} ${border}  text-[#ffffff6f] rounded-md`}
      >
        {text}
      </span>
    </div>
  );
}

export default NoTasks;
