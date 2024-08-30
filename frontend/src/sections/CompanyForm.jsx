import { Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/input";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";

const CompanyForm = ({ control, handleSubmit, errors }) => {
  return (
    <div className="flex flex-col text-lg p-2 mt-4 gap-3 ">
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="text"
                label="Name"
                placeholder="Enter your company name"
                errorMessage={errors.name?.message}
                isInvalid={!!errors.name}
                isRequired
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
                defaultValue={value}
                errorMessage={errors.description?.message}
                isInvalid={!!errors.description}
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
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 m-auto py-1">
        <SubmitButton onSubmit={handleSubmit}></SubmitButton>
      </div>
    </div>
  );
};

export default CompanyForm;
