import React from "react";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/icons/EyeSlashFilledIcon";

const PasswordInput = React.forwardRef(
  (
    { onChange, onBlur, value, label, isInvalid, isRequired, errorMessage },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value}
            radius="sm"
            size="md"
            label={label}
            variant="flat"
            labelPlacement="outside"
            placeholder="Enter your password"
            isInvalid={isInvalid}
            isRequired={isRequired}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
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

export default PasswordInput;
