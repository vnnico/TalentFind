import UploadFile from "../components/UploadFile";
import JobCard from "../components/JobCard";
import JobPostForm from "../sections/JobPostForm";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const JobPost = () => {
  const { data, isError } = useQuery({
    queryKey: ["companyJobPost"],
    queryFn: apiClient.getPostedJob,
  });

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
          {data && data.jobLists ? (
            <div className="w-full flex flex-col gap-3 py-4">
              {data &&
                data.jobLists.map((jobList, index) => (
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
