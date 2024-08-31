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

export default function JobCard({ jobList }) {
  return (
    <Card className="w-full sm:max-w-[250px] md:max-w-[300px] shadow-md bg-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm">{jobList.name}</p>
          <p className="text-sm font-semibold">{jobList.company}</p>
          <p className="text-xs text-default-500 text-right">
            {jobList.salary}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="md:text-md text-sm">{jobList.jobDescription}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="success" className="text-white " size="sm">
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
}
