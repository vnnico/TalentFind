import DateInput from "../components/DateInput";
import InputForm from "../components/InputForm";
import NextButton from "../components/NextButton";
import { useForm, useController, Controller } from "react-hook-form";
import { input, Input } from "@nextui-org/react";

const TalentInfo = ({ clickNext, talentInput, setTalentInput }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: talentInput,
    mode: "all",
  });

  const onSubmit = (data) => {
    setTalentInput(data);
    clickNext();
  };

  return (
    <form
      action=""
      className="flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name="fullname"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <InputForm
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              type="text"
              label="Fullname"
              placeholder="e.g: John Doe"
            ></InputForm>
          );
        }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <InputForm
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              type="email"
              label="Email"
              placeholder="e.g: you@gmail.com"
            ></InputForm>
          );
        }}
      />
      <Controller
        control={control}
        name="dob"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <DateInput
              label="Birth Date"
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
            ></DateInput>
          );
        }}
      />
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <InputForm
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              type="text"
              label="Phone"
              placeholder="e.g: 08xxxxxxxxxx"
            ></InputForm>
          );
        }}
      />
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, onBlur, value, ref } }) => {
          return (
            <InputForm
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              type="text"
              label="Address"
              placeholder="e.g: Baker Street No.19"
            ></InputForm>
          );
        }}
      />
      <NextButton></NextButton>
    </form>
  );
};

export default TalentInfo;
