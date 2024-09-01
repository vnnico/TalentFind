import { Link } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const FindJob = () => {
  const {
    data: jobLists,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["jobLists?"],
    queryFn: apiClient.getAllJobPosts,
  });

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
        {/* Change it into Your Personalized Job Portal after CV Analysis */}
        <h1 className="lg:text-xl md:text-xl font-bold text-center ">
          All job Portals
        </h1>
        <div className="flex w-full py-4 gap-5 flex-wrap justify-center ">
          {isError && (
            <div className="w-full">
              <p className="text-red-500 text-md">Error Fetching</p>
            </div>
          )}
          {isSuccess && (
            <>
              {data.jobLists.map((jobList, index) => (
                <>
                  <div className="w-full md:max-w-[300px] shadow-md">
                    <JobCard jobList={jobList} key={index}></JobCard>
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
