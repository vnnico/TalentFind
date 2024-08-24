import { Textarea } from "@nextui-org/input";
import NavigationButton from "../components/NavigationButton";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Description = ({ clickNext, clickPrev, description, setDescription }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: description,
    mode: "all",
  });

  const saveAndNext = (data) => {
    setDescription(data);
    clickNext();
  };

  const saveAndBack = (data) => {
    setDescription(data);
    clickPrev();
  };

  return (
    <>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <Textarea
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              ref={ref}
              variant="flat"
              radius="sm"
              minRows={7}
              defaultValue={value}
              isRequired
            ></Textarea>
          );
        }}
      />
      <NavigationButton
        clickNext={handleSubmit(saveAndNext)}
        clickPrev={handleSubmit(saveAndBack)}
      ></NavigationButton>
    </>
  );
};

export default Description;
