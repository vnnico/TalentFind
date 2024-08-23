import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";
import AddButton from "../components/AddButton";

const Skills = ({ clickNext, clickPrev }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4">
      <InputForm
        type="text"
        label="Company"
        placeholder="e.g: PT.Metaverse"
        isRequired
      ></InputForm>
      <InputForm
        type="text"
        label="Position"
        placeholder="e.g: Chief Technology Officer"
        isRequired
      ></InputForm>

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

export default Skills;
