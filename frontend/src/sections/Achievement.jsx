import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";
import DateInput from "../components/DateInput";
import { useForm, useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { DatePicker } from "antd";
import { Controller } from "react-hook-form";

const Achievement = ({ control, achievement, clickNext, clickPrev }) => {
  const { handleSubmit } = useForm({
    defaultValues: { achievement },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div className="flex flex-col gap-4" key={item.id}>
          {index > 0 && (
            <div className="flex gap-2">
              <h1 className="lg:text-xl md:text-lg font-bold">
                Achievement {index + 1}
              </h1>
              <button onClick={() => remove(index)}>
                <BsTrash className="hover:text-red-500 font-bold"></BsTrash>
              </button>
            </div>
          )}

          <Controller
            control={control}
            name={`achievements.${index}.name`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Name"
                  placeholder="e.g: Best Student Award "
                  isRequired
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`achievements.${index}.issuingBy`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Issuing By"
                  placeholder="e.g: XYZ University"
                  isRequired
                ></InputForm>
              );
            }}
          />
        </div>
      ))}

      <AddButton onClick={() => append()}></AddButton>
      <NavigationButton
        clickNext={clickNext}
        clickPrev={clickPrev}
      ></NavigationButton>
    </>
  );
};

export default Achievement;
