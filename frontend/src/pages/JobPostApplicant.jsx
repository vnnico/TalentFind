import JobCard from "../components/JobCard";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useNavigate, useParams } from "react-router-dom";
import TalentCard from "../components/TalentCard";

const JobPostApplicant = () => {
  const { jobPostID } = useParams();
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["applicantLists", jobPostID],
    queryFn: apiClient.getListApplicant,
  });

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
      {data && data.totalApplicants > 0 ? (
        <>
          <div className="mx-auto py-2">
            <h1 className="lg:text-3xl text-2xl font-bold underline-offset-3">
              {data.jobPostName}'s Applicants
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full py-2 gap-5 flex-wrap justify-center ">
              {data &&
                data.applicantLists.map((talentList, index) => (
                  <div className="w-full md:max-w-[300px] shadow-md">
                    <TalentCard
                      talentList={talentList}
                      key={index}
                    ></TalentCard>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto align-center text-center py-8 px-4 rounded-lg ">
          <div className="flex flex-col">
            <p className="font-semibold pb-3  text-2xl">
              There is no applicant
            </p>
            <Button
              color="warning"
              className="text-white w-[50%] m-auto"
              onClick={() => navigate("/find-talent")}
            >
              Find your talent
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostApplicant;
