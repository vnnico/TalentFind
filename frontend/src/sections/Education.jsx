import AddButton from "../components/AddButton";
import InputForm from "../components/InputForm";
import NavigationButton from "../components/NavigationButton";
import { Controller } from "react-hook-form";
import { useForm, useFieldArray } from "react-hook-form";
import { BsTrash } from "react-icons/bs";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const Education = ({ education, control, clickNext, clickPrev }) => {
  const { handleSubmit } = useForm({
    defaultValues: { education },
    // populate education like ...education
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  // const saveAndNext = (data) => {
  //   console.log(data.education);
  //   setEducation(data.education);
  //   clickNext();
  // };

  // const saveAndBack = (data) => {
  //   console.log(data.education);
  //   setEducation(data.education);
  //   clickPrev();
  // };
  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-col gap-4">
          {index > 0 && (
            <div className="flex gap-2">
              <h1 className="lg:text-xl md:text-lg font-bold">
                Education {index + 1}
              </h1>
              <button onClick={() => remove(index)}>
                <BsTrash className="hover:text-red-500 font-bold"></BsTrash>
              </button>
            </div>
          )}
          <Controller
            control={control}
            name={`education.${index}.institution`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Institution"
                  placeholder="e.g: Nusantara University"
                  isRequired
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`education.${index}.major`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="Major"
                  placeholder="e.g: Computer Science"
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`education.${index}.gpa`}
            render={({ field: { onChange, onBlur, value, ref } }) => {
              return (
                <InputForm
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  ref={ref}
                  type="text"
                  label="GPA"
                  placeholder="e.g: 3.8"
                ></InputForm>
              );
            }}
          />
          <Controller
            control={control}
            name={`education.${index}.yearRange`}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <p className="text-sm">Year period</p>
                  <RangePicker
                    onChange={onChange}
                    value={value}
                    variant="filled"
                    picker="year"
                    id={{
                      start: "startInput",
                      end: "endInput",
                    }}
                  />
                </>
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

export default Education;
