import { DatePicker } from "@nextui-org/react";

const DateInput = ({ label }) => {
  return (
    <DatePicker
      label={label}
      className="max-w-[284px]"
      labelPlacement="outside"
      variant="flat"
      showMonthAndYearPickers
    ></DatePicker>
  );
};

export default DateInput;
