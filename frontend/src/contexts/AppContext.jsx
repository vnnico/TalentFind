import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import Toast from "../components/Toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [toast, setToast] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (userId && token) {
      setIsLoggedIn(true);
    } else setIsLoggedIn(false);
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
