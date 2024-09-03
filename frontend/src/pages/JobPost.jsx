import JobCard from "../components/JobCard";
import TalentCard from "../components/TalentCard";
import JobPostForm from "../sections/JobPostForm";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalSpinner from "../components/GlobalSpinner";
import RegisterCompany from "../sections/RegisterCompany";

const JobPost = () => {
  const { data, isError: isErrorJobPost } = useQuery({
    queryKey: ["companyJobPost"],
    queryFn: apiClient.getPostedJob,
  });
  const {
    isError: isErrorCompany,
    data: company,
    isLoading,
  } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });
  const navigate = useNavigate();

  const viewApplicant = (jobPostID) => {
    navigate(`/job-posts/${jobPostID}`);
  };

  if (isLoading) return <GlobalSpinner />;
  if (isErrorCompany) return <RegisterCompany />;

  return (
    <div className="justify-content mx-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 bg-white h-full gap-4 ">
      <div className="flex gap-6 max-md:flex-col">
        <div className="flex flex-col basis-1/2 text-black gap-4 h-full">
          <h1 className="lg:text-3xl md:text-xl font-bold">
            Post a Job Portal
          </h1>
          <p className="text-sm md:text-left">
            Your Company : <b>{company?.name}</b>
          </p>
          <JobPostForm></JobPostForm>
        </div>
        <div className="flex flex-col basis-1/2 p-10 gap-2 overflow-y-auto shadow-xl overflow-y-auto h-[400px]">
          <h1 className="lg:text-xl md:text-xl font-bold text-center">
            Your Job Portals
          </h1>
          {data && data.jobLists.length > 1 ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {data &&
                data.jobLists.map((jobList, index) => (
                  <JobCard
                    jobList={jobList}
                    key={index}
                    recruiter={true}
                    viewApplicant={viewApplicant}
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
    </div>
  );
};

export default JobPost;
