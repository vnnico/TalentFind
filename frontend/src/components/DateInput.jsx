import { DatePicker } from "@nextui-org/react";

const DateInput = ({ onChange, onBlur, selected, label }) => {
  return (
    <DatePicker
      label={label}
      defaultValue={selected}
      className="max-w-[284px]"
      labelPlacement="outside"
      variant="flat"
      showMonthAndYearPickers
      onChange={onChange}
      onBlur={onBlur}
    ></DatePicker>
  );
};

export default DateInput;
