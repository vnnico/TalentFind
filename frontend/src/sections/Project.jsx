import { Textarea } from "@nextui-org/input";
import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";
import BackButton from "../components/BackButton";

const Project = ({ clickNext, clickPrev }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4">
      <InputForm
        type="text"
        label="Project Name"
        placeholder="e.g: E-commerce Web"
        isRequired
      ></InputForm>
      <Textarea
        variant="flat"
        radius="sm"
        label="Description"
        labelPlacement="outside"
        isRequired
      ></Textarea>
      <AddButton></AddButton>
      <BackButton clickPrev={clickPrev}></BackButton>
      <button>Save</button>
    </form>
  );
};

export default Project;
