import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import { Button } from "@nextui-org/react";

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

const Application = () => {
  return (
    <div className="justify-content m-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 min-h-screen">
      {jobLists ? (
        <>
          <div className="mx-auto py-2">
            <h1 className="lg:text-3xl text-2xl font-bold underline-offset-3">
              List of your Job Applications
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full py-2 gap-5 flex-wrap justify-center ">
              {jobLists.map((jobList, index) => (
                <JobCard jobList={jobList} key={index}></JobCard>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto align-center text-center py-8 px-4 rounded-lg ">
          <div className="flex flex-col">
            <p className="font-semibold pb-3  text-2xl">
              You have no Job Applications
            </p>
            <Button color="warning" className="text-white w-[50%] m-auto">
              Find your job
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
