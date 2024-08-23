import InputForm from "../components/InputForm";
import { Textarea } from "@nextui-org/input";
import NavigationButton from "../components/NavigationButton";
import AddButton from "../components/AddButton";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const Experience = ({ clickNext, clickPrev }) => {
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
      <Textarea
        variant="flat"
        radius="sm"
        label="Description"
        labelPlacement="outside"
        isRequired
      ></Textarea>
      {/* <div className="flex gap-5">
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
      </div> */}
      <Space direction="vertical" size={12}>
        <RangePicker
          variant="filled"
          picker="year"
          id={{
            start: "startInput",
            end: "endInput",
          }}
        />
      </Space>
      <AddButton></AddButton>
      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </form>
  );
};

export default Experience;
