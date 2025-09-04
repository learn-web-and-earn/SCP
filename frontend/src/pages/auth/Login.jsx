import { setLoading, setLoggedIn, setToken, setUser } from '@/store/authSlice';
import { authFetch } from '@/utils/authFetch';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
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
      const res = await authFetch(`${import.meta.env.VITE_API}/auth/user/login`, {
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
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={data.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={data.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login