import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Progress } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const { Dragger } = Upload;

const UploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: apiClient.analyzeCV,
    onSuccess: async (data, variables) => {
      message.success(`${variables.name} file analyzed successfully.`);
      showToast({ message: data.message, type: "success" });
      queryClient.invalidateQueries("jobLists");
      setUploadProgress(100); // Set to 100% once analysis is complete
      setIsAnalyzing(false); // Stop progress bar once analysis is done
    },
    onError: async (error, variables) => {
      message.error(`${variables.name} file analysis failed.`);
      showToast({ message: error.message, type: "error" });
      setIsAnalyzing(false); // Stop progress bar if there's an error
    },
  });

  const uploadProps = {
    name: "file",
    multiple: false,
    customRequest: ({ file, onSuccess, onError, onProgress }) => {
      // Simulate the upload progress
      const simulateUploadProgress = () => {
        let percent = 0;
        const interval = setInterval(() => {
          percent += 1;
          setUploadProgress(percent);
          onProgress({ percent });
          if (percent >= 100) {
            clearInterval(interval);
            setIsAnalyzing(true); // Start the analysis phase
            mutation.mutate(file, {
              onSuccess: () => {
                onSuccess("Ok");
              },
              onError: (error) => {
                onError(error);
              },
            });
          }
        }, 900); // Adjust the speed of simulated upload
      };

      simulateUploadProgress();
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
    <div>
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
      {(uploadProgress > 0 || isAnalyzing) && (
        <Progress
          percent={uploadProgress}
          status={isAnalyzing ? "active" : "normal"}
          showInfo={true}
        />
      )}
    </div>
  );
};

export default UploadFile;
