const SubmitButton = ({ onSubmit }) => {
  return (
    <button
      className="text-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white w-full"
      type="submit"
      onClick={onSubmit}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
