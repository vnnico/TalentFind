import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const SelectInput = React.forwardRef(
  (
    { onChange, onBlur, selected, isRequired, errorMessage, isInvalid },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {/* <p className="text-sm w-full text-left max-md:mt-3">Select Gender</p> */}
        <div className="flex w-full flex-wrap mb-1  gap-4">
          <Select
            size="md"
            label="Gender"
            labelPlacement="outside"
            placeholder="Select gender"
            value={selected}
            isRequired={isRequired}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            isInvalid={isInvalid}
          >
            <SelectItem key="Male">Male</SelectItem>
            <SelectItem key="Female">Female</SelectItem>
          </Select>
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

export default SelectInput;
