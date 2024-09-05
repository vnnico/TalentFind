import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";
import ApplyModal from "./ApplyModal";

export default function JobCard({
  jobList,
  recruiter,
  applyJob,
  applied,
  viewApplicant,
}) {
  // sm:max-w-[250px] md:max-w-[300px] shadow-md
  return (
    <Card className="w-full  bg-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{jobList.name}</p>
          <p className="text-sm font-semibold">{jobList.companyName}</p>
          <p className="text-xs text-default-500 t">
            {jobList.salary.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="md:text-md text-sm">
          {(jobList.jobDescription &&
            jobList.jobDescription.substring(0, 40)) ||
            "No Description"}
        </p>
      </CardBody>
      <Divider />
      <CardFooter>
        <>
          {recruiter && (
            <>
              <Button
                color="warning"
                className="text-white "
                size="sm"
                onClick={() => viewApplicant(jobList._id)}
              >
                View
              </Button>
              <p className="ms-auto text-xs text-slate-500">
                Total Applicants : {jobList.totalApplicants}
              </p>
            </>
          )}

          {!recruiter && !applied && (
            // <Button
            //   color="success"
            //   className="text-white "
            //   size="sm"
            //   onClick={() => applyJob(jobList._id)}
            // >
            //   Apply
            // </Button>
            <ApplyModal jobList={jobList} applyJob={applyJob}></ApplyModal>
          )}

          {applied && (
            <Button color="warning" className="text-white " size="sm">
              Pending
            </Button>
          )}
        </>
      </CardFooter>
    </Card>
  );
}
