import { Link, useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Button } from "@nextui-org/react";

import PdfModal from "../components/PdfModal";

const FindJob = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["jobLists"],
    queryFn: apiClient.getAllJobPosts,
  });

  const {
    data: pdf,
    isLoading: isLoadingCV,
    isError: isErrorCV,
  } = useQuery({
    queryKey: ["cvLink"],
    queryFn: apiClient.getCV,
  });
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["apply"],
    mutationFn: apiClient.applyJob,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      navigate("/applications");
    },
    onError: async (data) => {
      showToast({ message: data.message, type: "error" });
    },
  });

  const applyJob = (jobPostID) => {
    mutation.mutate(jobPostID);
  };

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
          {pdf && pdf.cvLink && (
            <PdfModal
              fileUrl={`http://localhost:3000/files/${pdf.cvLink}`}
            ></PdfModal>
          )}
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
        {/* Change it into Your Personalized Job Portal after CV Analysis */}

        {data && data.recommendation === true ? (
          <h1 className="lg:text-xl md:text-xl font-bold text-center text-violet-700 ">
            Your Recommendation Job Portals
          </h1>
        ) : (
          <h1 className="lg:text-xl md:text-xl font-bold text-center ">
            All Job Portals
          </h1>
        )}
        <div className="flex w-full py-4 gap-5 flex-wrap justify-center ">
          {isError && (
            <div className="w-full">
              <p className="text-red-500 text-md">Error Fetching</p>
            </div>
          )}
          {isSuccess && (
            <>
              {data &&
                data.jobLists.map((jobList, index) => (
                  <>
                    <div className="w-full md:max-w-[300px] shadow-md">
                      <JobCard
                        jobList={jobList}
                        key={index}
                        applyJob={applyJob}
                      ></JobCard>
                    </div>
                  </>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJob;
