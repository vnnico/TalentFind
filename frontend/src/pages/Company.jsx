import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import RegisterCompany from "../sections/RegisterCompany";
import EditCompany from "../sections/EditCompany";
import GlobalSpinner from "../components/GlobalSpinner";

const Company = () => {
  const { isError, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: apiClient.getCompany,
  });

  if (isError) {
    return <RegisterCompany />;
  }

  if (isLoading) return <GlobalSpinner></GlobalSpinner>;

  return <EditCompany></EditCompany>;
};

export default Company;
