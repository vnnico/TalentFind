import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import JobPostForm from "../sections/JobPostForm";

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

const JobPost = () => {
  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 bg-white h-full gap-4 ">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Post a Job Portal
          </h1>
          <p className="text-sm md:text-left">
            Your Company : <b>PT. NiagaHoster</b>
          </p>
          <JobPostForm></JobPostForm>
        </div>
        <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl overflow-y-auto h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            Your Job Portals
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

export default JobPost;
