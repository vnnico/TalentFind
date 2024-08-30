import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    if (isLoggedIn === undefined) {
      return <div>Loading...</div>;
    }
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (msgDescription) => {
          setToast(msgDescription);
        },
        isLoggedIn,
        setIsLoggedIn,
        authenticate,
        logout,
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
