import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";

const OnlyRecruiter = ({ children }) => {
  const { isLoading, isLoggedIn, data } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/recruiter-login");
    else if (data && data.role !== "Recruiter") navigate("/auth");
  }, [data, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) return <div>Loading...</div>;

  if (data.role === "Recruiter") {
    return children;
  }

  return null;
};

export default OnlyRecruiter;
