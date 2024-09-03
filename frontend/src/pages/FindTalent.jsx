import JobCard from "../components/JobCard";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import SubmitButton from "../components/buttons/SubmitButton";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import TalentCard from "../components/TalentCard";
import GlobalSpinner from "../components/GlobalSpinner";
import RegisterCompany from "../sections/RegisterCompany";

const FindTalent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const { data, isError } = useQuery({
    queryKey: ["talentList"],
    queryFn: apiClient.getAllTalents,
  });
  const { isError: isErrorCompany, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });

  if (isLoading) return <GlobalSpinner />;
  if (isErrorCompany) return <RegisterCompany />;

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 bg-white h-full gap-4 ">
      <div className="flex gap-6 max-md:flex-col pe-4">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Find Your Talent with AI
          </h1>
          <p className="text-sm md:text-left">
            Unlock the power of AI to discover the ideal candidates for your
            team. Simply enter your requirements in the prompt, and let our
            advanced algorithm to browse through tailored talent recommendations
            and make the best hire with just a click!
          </p>
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
                  minRows={11}
                  radius="sm"
                  label="Prompt"
                  labelPlacement="inside"
                  placeholder="e.g : Our company needs a Machine Learning Engineer with skills in Python, TensorFlow, and 5 years of experience. The ideal candidate should have a Master’s degree in Computer Science from an Ivy League university, a track record of successful AI projects, and achievements in published research papers"
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                  isRequired
                ></Textarea>
              );
            }}
          />
          <SubmitButton></SubmitButton>
        </div>
        <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl overflow-y-auto h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            All Talents
          </h1>
          {data ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {data &&
                data.talentLists.map((talentList, index) => (
                  <TalentCard talentList={talentList} key={index}></TalentCard>
                ))}
            </div>
          ) : (
            <p className="text-xs md:text-left m-auto text-slate-500">
              No Result yet
            </p>
          )}
        </div>
      </div>
      <div className="flex lg:mt-10 mt-3 flex-col gap-4">
        <h1 className="lg:text-xl md:text-xl font-bold text-center ">
          Total Applicants : 14
        </h1>
      </div>
    </div>
  );
};

export default FindTalent;
