import { useState } from "react";
import z from "zod";
import { loginUser } from "../services/UserLoginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInHandler } from "../store/slice/Login";

const loginFormSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldSchema = loginFormSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setError((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginFormSchema.safeParse(formData);

    if (!result.success) {
      const entries = result.error.issues.map((issue) => [
        issue.path[0],
        issue.message,
      ]);
      const errors = Object.fromEntries(entries);
      setError(errors);
      return;
    }

    try {
      const res = await loginUser(formData);

      dispatch(logInHandler(res.data));
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // return (
  //   <div className="flex h-screen">
  //     <div
  //       className="w-[5vw]"
  //       style={{ backgroundImage: `url(${bgImage})` }}
  //     ></div>

  //     <div className="flex-1 flex items-center justify-center bg-white">
  //       <div className="bg-white rounded-xl h-[60vh] w-[25vw] flex flex-col items-center justify-center gap-6 p-8 shadow-lg">
  //         <p className="font-semibold text-2xl">Welcome Back</p>
  //         <p className="text-gray-600 text-sm text-center">
  //           Welcome back, please enter your details
  //         </p>
  //         <div className="flex flex-col gap-4 w-full">
  //           <form
  //             className="flex flex-col gap-4 w-full"
  //             onSubmit={handleSubmit}
  //           >
  //             <h6 className="font-semibold">Email</h6>
  //             <input
  //               name="email"
  //               type="text"
  //               placeholder="Enter Email"
  //               value={formData.email}
  //               onChange={handleChange}
  //               className="w-full border border-gray-300 rounded px-3 py-2"
  //             />
  //             {error.email ? (
  //               <span className="text-red-500"> {error.email} </span>
  //             ) : null}
  //             <h6 className="font-semibold">Password</h6>
  //             <input
  //               name="password"
  //               type="text"
  //               placeholder="Enter passwprd"
  //               value={formData.password}
  //               onChange={handleChange}
  //               className="w-full border rounded border-gray-300 px-3 py-2"
  //             />
  //             {error.password ? (
  //               <span className="text-red-500"> {error.password} </span>
  //             ) : null}
  //             <button
  //               type="submit"
  //               className="rounded bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition"
  //             >
  //               Sign In
  //             </button>
  //           </form>
  //           <button
  //             onClick={() => {
  //               navigate("/signup");
  //             }}
  //             className="rounded border border-indigo-600 text-indigo-600 py-2 font-medium hover:bg-indigo-50 transition"
  //           >
  //             Sign Up
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       className="w-[47.5vw] bg-cover bg-center"
  //       style={{ backgroundImage: `url(${bgImage})` }}
  //     ></div>
  //   </div>
  // );

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
