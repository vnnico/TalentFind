import { Input } from "@nextui-org/react";
import React from "react";

const InputForm = React.forwardRef(
  ({ onChange, onBlur, type, label, placeholder, value, isRequired }, ref) => {
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
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
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

export default InputForm;