import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import PdfModal from "../components/PdfModal";

export default function TalentCard({ talentList, similarityScore }) {
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
        <div className="flex gap-1">
          <p className="md:text-lg font-semibold text-md">Similarity Score: </p>
          {similarityScore && similarityScore <= 50 && (
            <p className="md:text-lg text-red-500 font-semibold text-md">
              {similarityScore}%
            </p>
          )}
          {similarityScore > 50 && similarityScore <= 80 && (
            <p className="md:text-lg text-yellow-500 font-semibold text-md">
              {similarityScore}%
            </p>
          )}
          {similarityScore > 80 && (
            <p className="md:text-lg text-green-500 font-semibold text-md">
              {similarityScore}%
            </p>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        {talentList.cvFile && (
          <PdfModal
            fileUrl={`http://localhost:3000/files/${talentList.cvFile}`}
            recommendation={true}
          ></PdfModal>
        )}
      </CardFooter>
    </Card>
  );
}
