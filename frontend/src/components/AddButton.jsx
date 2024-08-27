const AddButton = ({ onClick }) => {
  return (
    <button
      className="text-lg bg-orange-400 text-white w-1/3"
      onClick={onClick}
      type="button"
    >
      Add More
    </button>
  );
};

export default AddButton;
