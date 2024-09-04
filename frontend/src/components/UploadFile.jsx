import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const { Dragger } = Upload;

const UploadFile = () => {
  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: apiClient.analyzeCV,
    onSuccess: (data, variables) => {
      message.success(`${variables.name} file uploaded successfully.`);
    },
    onError: (error, variables) => {
      message.error(`${variables.name} file upload failed.`);
      console.error("Error uploading file:", error);
    },
  });
  const uploadProps = {
    name: "file",
    multiple: false,
    customRequest: ({ file, onSuccess, onError }) => {
      mutation.mutate(file, {
        onSuccess: () => {
          onSuccess("Ok");
        },
        onError: (error) => {
          onError(error);
        },
      });
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon align-center">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Upload your CV in PDF format to begin your AI-powered analysis.
      </p>
    </Dragger>
  );
};

export default UploadFile;
