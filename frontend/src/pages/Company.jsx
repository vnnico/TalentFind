import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import RegisterCompany from "../sections/RegisterCompany";
import EditCompany from "../sections/EditCompany";

const Company = () => {
  const { isError } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });

  if (isError) {
    return <RegisterCompany />;
  }

  return <EditCompany></EditCompany>;
};

export default Company;
