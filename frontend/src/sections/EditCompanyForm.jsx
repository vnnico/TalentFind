import { Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";
import { Button } from "@nextui-org/react";

const EditCompanyForm = ({
  control,
  handleSubmit,
  errors,
  company,
  isReadOnly,
  isEdit,
  setIsEdit,
}) => {
  return (
    <div className="flex flex-col text-lg p-2 mt-4 gap-3 ">
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                ref={ref}
                type="text"
                label="Name"
                placeholder="Enter your company name"
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                isRequired
                isReadOnly={isReadOnly}
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="email"
                label="Email"
                placeholder="Enter your company email"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                isReadOnly={isReadOnly}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full lg:w-1/2 m-auto text-left text-black font-medium">
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <Textarea
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                variant="flat"
                radius="sm"
                label="Description"
                labelPlacement="outside"
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
                isReadOnly={isReadOnly}
                isRequired
              ></Textarea>
            );
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="industry"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Industry"
                placeholder="Enter your Company's Industry"
                errorMessage={errors.industry?.message}
                isInvalid={!!errors.industry}
                isReadOnly={isReadOnly}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Location"
                placeholder="Enter your location"
                errorMessage={errors.location?.message}
                isInvalid={!!errors.location}
                isReadOnly={isReadOnly}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="website"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Website"
                placeholder="Enter your website"
                errorMessage={errors.website?.message}
                isInvalid={!!errors.website}
                isReadOnly={isReadOnly}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 m-auto  py-1">
        {isEdit && (
          <div className="flex gap-2 justify-center">
            <Button
              color="primary"
              size="sm"
              type="submit"
              onSubmit={handleSubmit}
            >
              Save
            </Button>
            <Button color="danger" size="sm" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </div>
        )}
        {!isEdit && (
          <Button color="warning" size="sm" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditCompanyForm;
