import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../slices/adminAdminApiSlice";
import { setAdminCredentials } from "../slices/adminAuthSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Sign In</h1>

      <form onSubmit={submitHandler} className="w-96">
        <div className="my-2">
          <label className="mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-600 px-3 py-2"
          />
        </div>

        <div className="my-2">
          <label className="mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-600 px-3 py-2"
          />
        </div>

        {isLoading && <Loader />}

        <button
          type="submit"
          className="bg-black text-white mt-3 px-4 py-2 rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-2 hover:border-black transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLoginScreen;
