import bgImage from "../assets/images/task management.PNG";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div
        className="w-[5vw]"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="bg-white rounded-xl h-[50vh] w-[25vw] flex flex-col items-center justify-center gap-6 p-8 shadow-lg">
          <p className="font-semibold text-2xl">Welcome Back</p>
          <p className="text-gray-600 text-sm text-center">
            Welcome back, please enter your details
          </p>
          <div className="flex flex-col gap-4 w-full">
            <button className="rounded bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition">
              Sign In
            </button>
            <button className="rounded border border-indigo-600 text-indigo-600 py-2 font-medium hover:bg-indigo-50 transition">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-[47.5vw] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
    </div>
  );
};

export default Login;
