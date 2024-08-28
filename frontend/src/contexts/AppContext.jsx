import { createContext, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);

  return (
    <AppContext.Provider
      value={{
        showToast: (msgDescription) => {
          setToast(msgDescription);
        },
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
