import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          ...res,
        })
      );
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="mb-36">
        <div className="text-black text-center mb-4 text-2xl font-semibold">
          Sign In
        </div>
        <form className="p-6 w-96 bg-white rounded-md shadow-md" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-blue-900 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full border border-gray-600 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-900 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="w-full border border-gray-600 px-3 py-2"
            />
          </div>
          {isLoading && <Loader />}
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
