import { Input } from "@nextui-org/react";

const InputForm = ({ type, label, placeholder, value, isRequired }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input
          radius="sm"
          variant="flat"
          type={type}
          label={label}
          labelPlacement="outside"
          placeholder={placeholder ?? ""}
          size="md"
          isRequired={isRequired ?? ""}
        />
      </div>
    </div>
  );
};

export default InputForm;
