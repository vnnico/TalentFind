import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "../components/Toast";
import * as apiClient from "../api-client";
import { dateRangePicker } from "@nextui-org/react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  // const [applicationList, setApplicationList] = useState([]);
  const queryClient = useQueryClient();

  const { isError, data, isLoading } = useQuery({
    queryKey: ["authenticated"],
    queryFn: apiClient.validateToken,
    onError: async () => {
      await queryClient.refetchQueries();
    },
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (msgDescription) => {
          setToast(msgDescription);
        },
        isLoggedIn: !isError,
        isLoading,
        data,
      }}
    >
      {toast && (
        <Toast
          msgDescription={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        ></Toast>
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
