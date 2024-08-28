import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex flex-col justify-content min-h-screen bg-slate-100 ">
      <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
        <h1 className="font-semibold ">
          Welcome to{" "}
          <div className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-700 text-white inline-block p-2 rounded-lg">
            Talent<span className="text-yellow-400">Find</span>{" "}
          </div>
        </h1>

        <div className="flex flex-col w-full mt-7 gap-3">
          <Link
            to="/auth/talent-login"
            className="w-full  font-bold py-3 border-2 border-violet-600"
          >
            Join as Talent
          </Link>
          <Link
            to="/auth/recruiter-login"
            className="w-full  font-bold py-3 border-2 border-violet-600"
          >
            Join as Recruiter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
