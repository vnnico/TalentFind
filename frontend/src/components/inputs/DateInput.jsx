import React from "react";
import { DatePicker } from "@nextui-org/react";

const DateInput = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      value,
      label,
      isReadOnly,
      isRequired,
      isInvalid,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="flex w-full flex-wrap mb-1  gap-4 text-left">
          <DatePicker
            selected={value}
            ref={ref}
            label={label}
            labelPlacement="outside"
            size="md"
            variant="flat"
            showMonthAndYearPickers
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={isInvalid}
            isReadOnly={isReadOnly}
            isRequired={isRequired}
          ></DatePicker>
        </div>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm w-full text-left max-md:mt-1">
            {errorMessage}
          </p> // Display error message below the input
        )}
      </div>
    );
  }
);

export default DateInput;
