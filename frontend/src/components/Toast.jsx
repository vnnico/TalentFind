import React from "react";
import { Alert } from "antd";
import { useEffect } from "react";

const Toast = ({ type, msgDescription, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {type === "success" && (
          <Alert message={msgDescription} type="success" showIcon />
        )}
        {type === "error" && (
          <Alert message={msgDescription} type="error" showIcon />
        )}
      </div>
    </>
  );
};
export default Toast;
