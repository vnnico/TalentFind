import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";
import DateInput from "../components/DateInput";

const Achievement = ({ clickNext, clickPrev }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4 ">
      <InputForm
        type="text"
        label="Name"
        placeholder="e.g: Best Student Award "
        isRequired
      ></InputForm>
      <InputForm
        type="text"
        label="Issuing By"
        placeholder="e.g: XYZ University"
        isRequired
      ></InputForm>
      <DateInput label="Date"></DateInput>
      <AddButton></AddButton>
      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </form>
  );
};

export default Achievement;
