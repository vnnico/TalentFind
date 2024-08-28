import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (userId && token && role) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsCheckingLogin(false);
  });

  console.log(isLoggedIn);

  return (
    <AppContext.Provider
      value={{
        showToast: (msgDescription) => {
          setToast(msgDescription);
        },
        isLoggedIn,
        setIsLoggedIn,
        isCheckingLogin,
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
