const BackButton = ({ clickPrev }) => {
  return (
    <button
      className="text-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white w-1/2"
      onClick={clickPrev}
      type="button"
    >
      Back
    </button>
  );
};

export default BackButton;
