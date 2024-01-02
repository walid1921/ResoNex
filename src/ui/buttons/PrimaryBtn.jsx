function PrimaryBtn({ onClick, text, disabled, hidden}) {
  return (
    <button
      className={`border border-[#3654ff] hover:bg-[#3a6ef0cb] bg-[#3a6df0] px-4 py-2 rounded-md text-sm transition-all ease-in duration-150 hover:opacity-75 gap-2 ${hidden}`}
      onClick={onClick} disabled={disabled}
    >
      {text}
    </button>
  );
}

export default PrimaryBtn;
