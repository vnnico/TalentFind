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

export default function JobCard({ jobList, recruiter }) {
  // sm:max-w-[250px] md:max-w-[300px] shadow-md
  return (
    <Card className="w-full  bg-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{jobList.name}</p>
          <p className="text-sm font-semibold">{jobList.companyID.name}</p>
          <p className="text-xs text-default-500 t">
            {jobList.salary.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="md:text-md text-sm">Default dulu</p>
      </CardBody>
      <Divider />
      <CardFooter>
        {recruiter ? (
          <>
            <Button color="warning" className="text-white " size="sm">
              View
            </Button>
            <p className="ms-auto text-xs text-slate-500">
              Total Applicants : {jobList.applicants}
            </p>
          </>
        ) : (
          <Button color="success" className="text-white " size="sm">
            Apply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
