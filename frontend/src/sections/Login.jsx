import { Controller } from "react-hook-form";
import InputForm from "../components/inputs/InputForm";
import SubmitButton from "../components/buttons/SubmitButton";

const Login = ({ control, handleSubmit, errors }) => {
  return (
    <div className="flex flex-col text-lg p-2 mt-4 gap-3 ">
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
                placeholder="Enter your email"
                errorMessage={errors.email?.message}
                isInvalid={!!errors.email}
                isRequired
              ></InputForm>
            );
          }}
        />
      </div>
      <div className="w-full lg:w-1/2 m-auto">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
              <InputForm
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                ref={ref}
                type="password"
                label="Password"
                placeholder="Enter your password"
                errorMessage={errors.password?.message}
                isInvalid={!!errors.password}
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

export default Login;
