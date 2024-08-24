import { useEffect } from "react";
import DateInput from "../components/DateInput";
import InputForm from "../components/InputForm";
import NextButton from "../components/NextButton";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

const TalentInfo = ({ index, clickNext, talentInput, setTalentInput }) => {
  const { handleSubmit, control } = useForm({
    defaultValues: talentInput,
    mode: "all",
  });

  // do not stack action one after another. Utilize useEffect to seperate these actions. (dependency [index])
  const saveAndNext = (data) => {
    setTalentInput(data);
    clickNext();
  };

  return (
    <>
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
      <NextButton clickNext={handleSubmit(saveAndNext)}></NextButton>
    </>
  );
};

export default TalentInfo;
