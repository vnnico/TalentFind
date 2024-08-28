import { useEffect } from "react";
import DateInput from "../components/inputs/DateInput";
import InputForm from "../components/inputs/InputForm";
import NextButton from "../components/buttons/NextButton";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

const TalentInfo = ({ talent, clickNext }) => {
  return (
    <>
      <InputForm
        type="text"
        label="Fullname"
        placeholder="e.g: John Doe"
        value={talent.name}
        isReadOnly={true}
      />
      <InputForm
        type="email"
        label="Email"
        placeholder="e.g: you@gmail.com"
        value={talent.email}
        isReadOnly={true}
      />
      <DateInput label="Birth Date" isReadOnly={true} selected={talent.dob} />
      <InputForm
        type="text"
        label="Phone"
        placeholder="e.g: 08xxxxxxxxxx"
        value={talent.phoneNumber}
        isReadOnly={true}
      />
      <InputForm
        type="text"
        label="Address"
        placeholder="e.g: Baker Street No.19"
        value={talent.address}
        isReadOnly={true}
      />
      <NextButton clickNext={clickNext}></NextButton>
    </>
  );
};

export default TalentInfo;
