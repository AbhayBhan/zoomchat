import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { register,reset } from "../features/auth/authSlice";
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

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
    if(!username || !email || !password || !confPass){
      toast.error("Please add all the fields.");
      return;
    }
    if(password !== confPass){
      toast.error("Passwords do not match!");
      return;
    }
    const userData = {name : username, email : email, password : password};
    dispatch(register(userData));
  }
  return (
    <form onSubmit={handleSubmit} className="container flex flex-col p-4 mt-16 h-full max-w-md border-2 border-gray-300 rounded-lg">
      <div id="form-title" className="mx-auto">
        <h1 className="text-3xl font-bold">Register</h1>
      </div>
      <div className="border-0 my-4 border-b-2 border-black max-w-md"></div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Username</h1>
        <input
          className="border-2 max-w-md border-gray-300 rounded-md px-2 py-1"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Name..."
        />
      </div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Email</h1>
        <input
          className="border-2 max-w-md border-gray-300 rounded-md px-2 py-1"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email..."
        />
      </div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Password</h1>
        <input
          className="border-2 max-w-md border-gray-300 rounded-md px-2 py-1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password..."
        />
      </div>
      <div id="form-grp" className="space-y-2 mb-6">
        <h1>Confirm Password</h1>
        <input
          className="border-2 border-gray-300 rounded-md px-2 py-1"
          type="password"
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          placeholder="Confirm your Password..."
        />
      </div>
      <Link to='/login' ><h4 className="text-sm text-blue-600 mb-6 underline hover:text-blue-800">Already have an account?</h4></Link>
      <button type="submit" className="max-w-md text-white font-medium bg-black py-1 rounded-lg transition-all duration-150 hover:text-black hover:bg-white">
        Register
      </button>
    </form>
  );
};

export default Register;
