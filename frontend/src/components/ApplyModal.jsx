import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { BsPersonWorkspace, BsBuildingsFill } from "react-icons/bs";

export default function ApplyModal({ jobList, applyJob }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="success"
        className="text-white "
        size="sm"
        onPress={onOpen}
      >
        Apply
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 mt-3">
                <div className="flex gap-2 items-center">
                  <BsPersonWorkspace />
                  <p className="text-xl"> {jobList.name}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <BsBuildingsFill />
                  <p className="text-md"> {jobList.companyName}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-md">
                    {jobList.salary.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </ModalHeader>

              <ModalBody>
                {jobList.jobDescription || "No Description"}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => applyJob(jobList._id)}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
