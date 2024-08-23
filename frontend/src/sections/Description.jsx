import { Textarea } from "@nextui-org/input";
import NavigationButton from "../components/NavigationButton";

const Description = ({ clickNext, clickPrev }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4">
      <Textarea variant="flat" radius="sm" minRows={7} isRequired></Textarea>

      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </form>
  );
};

export default Description;
