import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login,reset } from "../features/auth/authSlice";
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if(isError){
      toast.error(message);
    }

    if(isSuccess || user){
      navigate('/');
    }

    dispatch(reset());

  },[user, isError, isSuccess, dispatch, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.error("Please add all the fields.");
      return;
    }
    const userData = {email: email, password : password};
    dispatch(login(userData));
  }

  return (
    <form onSubmit={handleSubmit} className="container flex flex-col p-4 mt-16 h-full w-[40vw] border-2 border-gray-300 rounded-lg">
      <div id="form-title" className="mx-auto">
        <h1 className="text-3xl font-bold">Login</h1>
      </div>
      <div className="border-0 my-4 border-b-2 border-black w-[36vw]"></div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Email</h1>
        <input
          className="border-2 w-[36vw] border-gray-300 rounded-md px-2 py-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email..."
        />
      </div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Password</h1>
        <input
          className="border-2 w-[36vw] border-gray-300 rounded-md px-2 py-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password..."
        />
      </div>
      <Link to='/register' ><h4 className="text-sm text-blue-600 mb-6 underline hover:text-blue-800">Don't have an account?</h4></Link>
      <button type="submit" className="w-[36vw] text-white font-medium bg-black py-1 rounded-lg transition-all duration-150 hover:text-black hover:bg-white">
        Log In
      </button>
    </form>
  );
};

export default Login;
