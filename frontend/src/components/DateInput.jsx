import { DatePicker } from "@nextui-org/react";
import { parseAbsolute } from "@internationalized/date";

const DateInput = ({ onChange, onBlur, selected, label, isReadOnly }) => {
  // Convert ISO date string to JavaScript Date object
  let date = 0;
  try {
    date = parseAbsolute(selected);
  } catch (error) {
    date = selected;
  }
  return (
    <DatePicker
      label={label}
      defaultValue={date ?? selected}
      className="max-w-[284px]"
      labelPlacement="outside"
      variant="flat"
      showMonthAndYearPickers
      onChange={onChange}
      onBlur={onBlur}
      isReadOnly={isReadOnly}
    ></DatePicker>
  );
};

export default DateInput;
