import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation ,useGetSubscriptionsMutation} from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
// import SubscriptionHistory from "./components/userComponent/GetSubscriptionHistory.jsx"


const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const PROFILE_URL = "http://localhost:5000/images/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo,"hehehhe");
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password not matching");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("userImage", image);

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>


      {/* <Link to='/admin/get-subscriptions'>
      <button className=" text-green-400 hover:text-yellow-700  text-2xl font-semibold mb-6   float-right ">
      ₹ Subscription 
      </button>
      </Link> */}


      <Link to='/get-subscriptions'>
      <button className=" text-green-400 hover:text-yellow-700  text-2xl font-semibold mb-6   float-right ">
      ₹ Subscription 
      </button>
      </Link>

      <img 
              src={PROFILE_URL + userInfo.image} 
              alt={userInfo.name}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center center', 
        display: 'block', 
        margin: '0 auto' 
  
              }} 
              />   
             


      <form onSubmit={submitHandler}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email Address</label>
          <input
            type="email"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            className="mt-1 p-2 w-full border rounded"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Profile Picture</label>
          <input
            type="file"
            className="mt-1 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {isLoading && <Loader />}
        <button
          type="submit"
          className="mt-3 bg-gray-700 hover:bg-green-500 text-white font-semibold py-2 px-4 border border-gray-900 rounded-full transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileScreen;


