import { Input } from "@nextui-org/react";
import React from "react";

const InputForm = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      type,
      label,
      placeholder,
      value,
      defaultValue,
      isRequired,
      isReadOnly,
      errorMessage,
      isInvalid,
      description,
    },
    ref
  ) => {
    return (
      <div className="w-full flex flex-col lg:gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={value}
            radius="sm"
            variant="flat"
            type={type}
            label={label}
            labelPlacement="outside"
            placeholder={placeholder ?? ""}
            size="md"
            isRequired={isRequired ?? ""}
            isReadOnly={isReadOnly}
            ref={ref}
            isInvalid={isInvalid}
            // errorMessage={errorMessage}
          />
        </div>
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-sm w-full text-left max-md:mt-3">
            {errorMessage}
          </p> // Display error message below the input
        )}
      </div>
    );
  }
);

export default InputForm;
