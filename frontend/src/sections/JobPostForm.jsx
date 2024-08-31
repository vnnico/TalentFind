import { Controller } from "react-hook-form";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

const JobPostForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <div className="flex flex-col text-lg py-2 gap-4 justify-start ">
      <div className="w-[80%] ">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Job Name"
                placeholder="Enter your job name"
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-[80%]">
        <Controller
          control={control}
          name="salary"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Salary"
                placeholder="Enter your salary"
                errorMessage={errors.salary?.message}
                isInvalid={!!errors.salary}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>

      <div className="w-[80%]">
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
                label="Job Description"
                labelPlacement="outside"
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                isRequired
              ></Textarea>
            );
          }}
        />
      </div>

      <div className="w-[80%]  py-1">
        <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default JobPostForm;
