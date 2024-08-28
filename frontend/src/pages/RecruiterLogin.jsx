import Login from "../sections/Login";

const RecruiterLogin = () => {
  return (
    <div className="flex flex-col justify-content min-h-screen bg-slate-100 ">
      <div className="w-[85%] md:w-[50%] lg:text-2xl bg-white shadow-2xl justify-content m-auto text-center py-8 px-4 rounded-lg">
        <h1 className="font-semibold ">
          Login as{" "}
          <div className="bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-700 text-white inline-block p-2 rounded-lg">
            Recruiter
          </div>
        </h1>

        <Login></Login>

        <div className="flex flex-col w-full mt-7 gap-3"></div>
      </div>
    </div>
  );
};

export default RecruiterLogin;
