import InputForm from "../components/inputs/InputForm";
import NavigationButton from "../components/buttons/NavigationButton";
import AddButton from "../components/buttons/AddButton";
import { Controller } from "react-hook-form";
import { useForm, useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import BackButton from "../components/buttons/BackButton";
import SubmitButton from "../components/buttons/SubmitButton";

const Skills = ({ control, clickNext, skills, clickPrev }) => {
  const { handleSubmit } = useForm({
    defaultValues: { skills },
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  // const saveAndNext = (data) => {
  //   setSkills(data.skills);
  // };

  // const saveAndBack = (data) => {
  //   setSkills(data.skills);
  //   clickPrev();
  // };
  return (
    <>
      {fields.map((item, index) => (
        <div className="flex flex-col gap-4" key={item.id}>
          {index > 0 && (
            <div className="flex gap-2">
              <h1 className="lg:text-xl md:text-lg font-bold">
                Skill {index + 1}
              </h1>
              <button onClick={() => remove(index)}>
                <BsTrash className="hover:text-red-500 font-bold"></BsTrash>
              </button>
            </div>
          )}
          <Controller
            control={control}
            name={`skills.${index}.skill`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  type="text"
                  label="Skill"
                  placeholder="e.g: Python"
                  isRequired
                ></InputForm>
              );
            }}
          />
        </div>
      ))}

      <AddButton onClick={() => append()}></AddButton>
      <SubmitButton clickNext={clickNext}></SubmitButton>
    </>
  );
};

export default Skills;
