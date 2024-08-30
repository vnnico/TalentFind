import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import CompanyForm from "../sections/CompanyForm";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  description: Yup.string().required("Description is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().required("Website is required"),
});

const Company = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: apiClient.registerCompany,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      showToast({ message: data.message, type: "success" });
      navigate("/company");
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const postData = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex flex-col justify-content min-h-screen bg-slate-100 ">
      <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
        <h1 className="font-semibold ">Company Profile</h1>
        <form
          action=""
          onSubmit={handleSubmit(postData)}
          className="h-[300px] overflow-y-auto"
        >
          <CompanyForm
            control={control}
            handleSubmit={handleSubmit(postData)}
            errors={errors}
          ></CompanyForm>
        </form>

        <div className="flex flex-col w-full mt-7 gap-3"></div>
      </div>
    </div>
  );
};

export default Company;
