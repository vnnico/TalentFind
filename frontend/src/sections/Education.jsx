import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";

const Education = ({ clickNext, clickPrev }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4">
      <InputForm
        type="text"
        label="Institution"
        placeholder="e.g: Nusantara University"
        isRequired
      ></InputForm>
      <InputForm
        type="text"
        label="Major"
        placeholder="e.g: Computer Science"
      ></InputForm>
      <InputForm type="text" label="GPA" placeholder="e.g: 3.8"></InputForm>
      <div className="flex gap-5">
        <InputForm
          type="text"
          label="Year Start"
          placeholder="2023"
        ></InputForm>
        <InputForm
          type="text"
          label="Year End"
          placeholder="Present"
        ></InputForm>
      </div>
      <AddButton></AddButton>
      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </form>
  );
};

export default Education;
