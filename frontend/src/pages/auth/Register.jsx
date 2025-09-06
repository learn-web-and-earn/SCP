import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setLoading, setLoggedIn, setToken, setUser } from '@/store/authSlice';
import { authFetch } from '@/utils/authFetch';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await authFetch(`${import.meta.env.VITE_API}/auth/user/register`, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      toast.success(res.message);
      dispatch(setUser(res.user));
      dispatch(setLoggedIn(true));
      dispatch(setToken(res.token));
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");

    } catch (err) {
      toast.error(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex items-center justify-center p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col p-4 bg-white rounded-2xl shadow-2xl dark:bg-gray-800'>
          <div className='flex items-center '>
            <div className='mt-4 flex justify-center'>
            <img src="/Easter Bunny Boy waving.gif" alt="" />
          </div>
          <h1 className='text-2xl font-bold mb-4 text-center text-blue-600'>Sign up today, start earning instantly.</h1>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <Label>Name:</Label>
              <Input className={"bg-gray-200 dark:bg-gray-700"} type="text" name="name" value={data.name} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Email:</Label>
              <Input className={"bg-gray-200 dark:bg-gray-700"} type="email" name="email" value={data.email} onChange={handleChange} />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Password:</Label>
              <Input className={"bg-gray-200 dark:bg-gray-700"} type={showPassword ? "text" : "password"} name="password" value={data.password} onChange={handleChange} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-blue-600 cursor-pointer">
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <div className='flex justify-end'>
              <Button className='w-1/2 self-end bg-blue-600 hover:bg-blue-700 dark:bg-black dark:hover:bg-gray-600 dark:text-white cursor-pointer' type="submit">Sign Up</Button>
            </div>
            <div>
              <p>Already have an Account? <Link className='text-blue-600 hover:underline' to="/login">Log In</Link></p>
            </div>

          </form>
        </div>
        <div className='hidden md:block'>
          <img className='w-full h-full rounded-2xl shadow-2xl' src="/BannerImage.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Register