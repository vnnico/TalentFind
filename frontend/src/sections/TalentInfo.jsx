import DateInput from "../components/DateInput";
import InputForm from "../components/InputForm";
import NextButton from "../components/NextButton";

const TalentInfo = ({ clickNext }) => {
  return (
    <form action="" className="flex flex-col gap-4 mt-4">
      <InputForm
        type="text"
        label="Fullname"
        placeholder="e.g: John Doe"
      ></InputForm>
      <InputForm
        type="email"
        label="Email"
        placeholder="e.g: you@gmail.com"
      ></InputForm>
      <DateInput label="Birth Date"></DateInput>
      <InputForm
        type="text"
        label="Phone"
        placeholder="e.g: 08xxxxxxxxxx"
      ></InputForm>
      <InputForm
        type="text"
        label="Address"
        placeholder="e.g: Baker Street No.19"
      ></InputForm>

      <NextButton clickNext={clickNext}></NextButton>
    </form>
  );
};

export default TalentInfo;
