import JobCard from "../components/JobCard";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Textarea } from "@nextui-org/react";
import SubmitButton from "../components/buttons/SubmitButton";

const jobLists = [
  {
    id: 1,
    name: "Backend Developer",
    salary: "Rp.7.000.000,00 - Rp.10.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Tokopedia",
    applicants: 10,
  },
  {
    id: 2,
    name: "Frontend Developer",
    salary: "Rp.7.000.000,00 - Rp.10.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Tokopedia",
    applicants: 14,
  },
  {
    id: 3,
    name: "DevOps Engineer",
    salary: "Rp.18.000.000,00 - Rp.25.000.000,00",
    jobDescription: "Minimum experience 5 years",
    company: "Traveloka",
    applicants: 4,
  },
  {
    id: 4,
    name: "HR Recruiter",
    salary: "Rp.5.000.000,00 - Rp.7.000.000,00",
    jobDescription: "Minimum experience 1 years",
    company: "Traveloka",
    applicants: 16,
  },
  {
    id: 5,
    name: "Social Media Specialist",
    salary: "Rp.13.000.000,00 - Rp.15.000.000,00",
    jobDescription: "Minimum experience 3 years",
    company: "CIMB Niaga",
    applicants: 10,
  },
  {
    id: 6,
    name: "Senior Backend Developer",
    salary: "Rp.20.000.000,00 - Rp.25.000.000,00",
    jobDescription: "Minimum experience 5 years",
    company: "Bukalapak",
    applicants: 6,
  },
  {
    id: 7,
    name: "Principal Architect",
    salary: "Rp.35.000.000,00 - Rp.50.000.000,00",
    jobDescription: "Minimum experience 7 years",
    company: "Blibli",
    applicants: 2,
  },
  {
    id: 8,
    name: "Legal Staff",
    salary: "Rp.4.000.000,00 - Rp.6.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Blibli",
    applicants: 3,
  },
];

const FindTalent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
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
          {jobLists ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {jobLists.map((jobList, index) => (
                <JobCard
                  jobList={jobList}
                  key={index}
                  recruiter={true}
                ></JobCard>
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
        {/* Change it into Your Personalized Job Portal after CV Analysis */}
        <h1 className="lg:text-xl md:text-xl font-bold text-center ">
          Total Applicants : 14
        </h1>
      </div>
    </div>
  );
};

export default FindTalent;
