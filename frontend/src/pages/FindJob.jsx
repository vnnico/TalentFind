import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";

const jobLists = [
  {
    id: 1,
    name: "Backend Developer",
    salary: "Rp.7.000.000,00 - Rp.10.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Tokopedia",
  },
  {
    id: 2,
    name: "Frontend Developer",
    salary: "Rp.7.000.000,00 - Rp.10.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Tokopedia",
  },
  {
    id: 3,
    name: "DevOps Engineer",
    salary: "Rp.18.000.000,00 - Rp.25.000.000,00",
    jobDescription: "Minimum experience 5 years",
    company: "Traveloka",
  },
  {
    id: 4,
    name: "HR Recruiter",
    salary: "Rp.5.000.000,00 - Rp.7.000.000,00",
    jobDescription: "Minimum experience 1 years",
    company: "Traveloka",
  },
  {
    id: 5,
    name: "Social Media Specialist",
    salary: "Rp.13.000.000,00 - Rp.15.000.000,00",
    jobDescription: "Minimum experience 3 years",
    company: "CIMB Niaga",
  },
  {
    id: 6,
    name: "Senior Backend Developer",
    salary: "Rp.20.000.000,00 - Rp.25.000.000,00",
    jobDescription: "Minimum experience 5 years",
    company: "Bukalapak",
  },
  {
    id: 7,
    name: "Principal Architect",
    salary: "Rp.35.000.000,00 - Rp.50.000.000,00",
    jobDescription: "Minimum experience 7 years",
    company: "Blibli",
  },
  {
    id: 8,
    name: "Legal Staff",
    salary: "Rp.4.000.000,00 - Rp.6.000.000,00",
    jobDescription: "Minimum experience 2 years",
    company: "Blibli",
  },
];

const FindJob = () => {
  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 bg-white h-full gap-4 ">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Analyze your CV here
          </h1>
          <p className="text-sm md:text-left">
            Leverage the power of AI to analyze your CV and receive personalized
            feedback on your skills and strengths.
          </p>
          <p className="text-xs md:text-left">
            Don't have a CV yet? Create your own{" "}
            <Link to="/" className="text-blue-500">
              here
            </Link>
          </p>
          <UploadFile></UploadFile>
        </div>
        <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl overflow-y-auto h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            Result Analysis
          </h1>
          <p className="text-xs md:text-left m-auto text-slate-500">
            No Result yet
          </p>
        </div>
      </div>
      <div className="flex lg:mt-10 mt-3 flex-col gap-4">
        <h1 className="lg:text-xl md:text-xl font-bold text-center ">
          Your personalized Job Portals
        </h1>
        <div className="flex w-full py-4 gap-5 flex-wrap justify-center ">
          {jobLists.map((jobList, index) => (
            <JobCard jobList={jobList} key={index}></JobCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindJob;
