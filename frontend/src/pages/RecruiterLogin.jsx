import { Link } from "react-router-dom";
import Login from "../sections/Login";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const RecruiterLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { showToast, isLoggedIn, setIsLoggedIn } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.recruiterLogin,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      setIsLoggedIn(true);
      navigate("/company");
    },
    onError: async (data) => {
      showToast({ message: "Invalid Credentials", type: "error" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex flex-col justify-content min-h-screen bg-slate-100 ">
      <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
        <h1 className="font-semibold ">
          Login as{" "}
          <div className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-700 text-white inline-block p-2 rounded-lg">
            Recruiter
          </div>
        </h1>
        <form action="" onSubmit={handleSubmit(postData)}>
          <Login
            control={control}
            handleSubmit={handleSubmit(postData)}
            errors={errors}
          ></Login>
        </form>
        <p className="text-xs">
          Don't have an account yet?{" "}
          <Link to="/auth/register" className="text-indigo-700">
            Sign Up
          </Link>
        </p>

        <div className="flex flex-col w-full mt-7 gap-3"></div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
