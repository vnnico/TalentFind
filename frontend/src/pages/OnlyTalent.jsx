import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";
import GlobalSpinner from "../components/GlobalSpinner";

const OnlyTalent = ({ children }) => {
  const { isLoading, isLoggedIn, data } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) navigate("/auth/talent-login");
    else if (data && data.role !== "Talent") navigate("/auth");
  }, [data, isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) return <GlobalSpinner></GlobalSpinner>;

  if (data.role === "Talent") {
    return children;
  }

  // this code below may not work, because react is asynchronous hence navigate will always be mounted eventhough the conditions above is fullfiled. This can lead to Error "Cannot Update a Component (Browser Router) While Rendering a Different Component"

  // navigate("/auth");
  // return null;

  return null;
};

export default OnlyTalent;
