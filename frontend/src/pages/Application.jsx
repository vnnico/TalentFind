import JobCard from "../components/JobCard";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["jobApplications"],
    queryFn: apiClient.getAllJobApplication,
  });

  const navigate = useNavigate();

  if (isError) return <div>error fetch</div>;

  return (
    <div className="justify-content m-auto my-5 flex flex-col w-[90%] md:p-11  p-4 rounded-lg md:gap-10 min-h-screen">
      <Button
        color="warning"
        className="w-[10%] text-white mb-3"
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      {data && data.jobLists.length > 0 ? (
        <>
          <div className="mx-auto py-2">
            <h1 className="lg:text-3xl text-2xl font-bold underline-offset-3">
              List of your Job Applications
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="flex w-full py-2 gap-5 flex-wrap justify-center ">
              {data &&
                data.jobLists.map((jobList, index) => (
                  <div className="w-full md:max-w-[300px] shadow-md gap-5">
                    <JobCard
                      jobList={jobList}
                      key={index}
                      applied={true}
                    ></JobCard>
                  </div>
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
            <Button
              color="warning"
              className="text-white w-[50%] m-auto"
              onClick={() => navigate("/find-jobs")}
            >
              Find your job
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
