import { useState } from 'react';
import z from 'zod';
import { signupUser } from '../services/UserLoginService';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/productive-seeklogo.png';
import { useToast } from '../utils/hooks/useToasts';
import { Link } from 'react-router-dom';
import { logInHandler } from '../store/slice/Login';
import { useDispatch } from 'react-redux';
const signupFormSchema = z.object({
  email: z.email('Invalid Email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldSchema = signupFormSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setError((prev) => ({
      ...prev,
      [name]: result.success ? '' : result.error.issues[0].message,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ email: '', password: '' });
    const result = signupFormSchema.safeParse(formData);
    if (!result.success) {
      const errors = Object.fromEntries(
        result.error.issues.map((issue) => [issue.path[0], issue.message])
      );
      setError(errors);
      return;
    }

    try {
      const res = await signupUser(formData);
      toast.success('Account created successfully');
      dispatch(logInHandler(res.data));
      navigate('/home');
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 400) {
        toast.error(err.response.data.message);
      } else if (err.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img alt='Your Company' src={logo} className='mx-auto h-6 w-auto' />
          <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Let’s get you started! Sign up
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  autoComplete='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
                {error.email ? (
                  <span className='text-red-500'> {error.email} </span>
                ) : null}
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  autoComplete='current-password'
                  value={formData.password}
                  onChange={handleChange}
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
                {error.password ? (
                  <span className='text-red-500'> {error.password} </span>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Register
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            Already Registered,
            <Link
              to={'/login'}
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
