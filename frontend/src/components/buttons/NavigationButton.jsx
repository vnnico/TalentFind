import BackButton from "./BackButton";
import NextButton from "./NextButton";

const NavigationButton = ({ clickNext, clickPrev }) => {
  return (
    <div className="flex ms-auto w-1/2 gap-2">
      <BackButton clickPrev={clickPrev}></BackButton>
      <NextButton clickNext={clickNext}></NextButton>
    </div>
  );
};

export default NavigationButton;
