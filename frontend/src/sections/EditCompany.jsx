import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import CompanyForm from "../sections/CompanyForm";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import RegisterCompany from "../sections/RegisterCompany";
import EditCompanyForm from "../sections/EditCompanyForm";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  description: Yup.string().required("Description is required"),
  industry: Yup.string().required("Industry is required"),
  location: Yup.string().required("Location is required"),
  website: Yup.string().required("Website is required"),
});

const EditCompany = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    setIsReadOnly(!isEdit);
  }, [isEdit]);

  //Get the company
  const {
    data: company,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => company, [company]),
  });

  // useEffect(() => {
  //   reset(company);
  // }, [company]);

  // Register a company
  const mutation = useMutation({
    mutationFn: apiClient.updateCompany,
    onSuccess: async (data) => {
      await queryClient.refetchQueries();
      showToast({ message: data.message, type: "success" });
      setIsEdit(false);
      navigate("/company");
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const postData = (data) => {
    // console.log(data);
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex flex-col justify-content min-h-screen bg-slate-100 ">
        <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
          <>
            <h1 className="font-semibold ">Company Profile</h1>
            <form
              action=""
              onSubmit={handleSubmit(postData)}
              className="h-[300px] overflow-y-auto"
            >
              <EditCompanyForm
                control={control}
                handleSubmit={handleSubmit(postData)}
                errors={errors}
                company={company}
                isReadOnly={isReadOnly}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              ></EditCompanyForm>
            </form>
          </>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
