import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";

export default function TalentCard({ talentList }) {
  // sm:max-w-[250px] md:max-w-[300px] shadow-md
  return (
    <Card className="w-full  bg-white">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{talentList.name}</p>
          <p className="text-sm ">{talentList.gender}</p>
          <p className="text-sm text-blue-500">{talentList.email}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="md:text-md text-sm">Default dulu</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="primary">View CV</Button>
      </CardFooter>
    </Card>
  );
}
