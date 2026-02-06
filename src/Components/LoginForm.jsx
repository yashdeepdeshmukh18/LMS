import React, {useState} from "react";

import GoogleIcon from "../assets/icons/google.svg";
import FacebookIcon from "../assets/icons/facebook.svg";
import AppleIcon from "../assets/icons/apple.svg";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";



const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-[#FFFFFF] w-[90%] max-w-md rounded-xl shadow-xl p-6 sm:p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">Welcome back</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-purple-400"
            />

            {/* Show / Hide Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>

        </div>

        <p className="text-sm text-purple-600 cursor-pointer mb-5">
          Forget Password?
        </p>

        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium">
          Login
        </button>

        <div className="my-4 text-center text-gray-500">or</div>

        <div className="space-y-3">
            <button className="w-full border py-2 rounded-md hover:bg-gray-50 flex gap-3">
                <img src={GoogleIcon} alt="Google" className="w-5 h-5 ml-7" />
                <span className="ml-16">Continue with Google</span>
            </button>

            <button className="w-full border py-2 rounded-md hover:bg-gray-50 flex gap-3">
                <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 ml-7" />
                <span className="ml-16">Continue with Facebook</span>
            </button>

            <button className="w-full border py-2 rounded-md hover:bg-gray-50 flex gap-3">
                <img src={AppleIcon} alt="Apple" className="w-5 h-5 ml-7" />
                <span className="ml-16">Continue with Apple</span>
            </button>
        </div>

        {/* Switch to Signup */}
        <p className="text-sm text-center mt-4">
          New to SmaranAI?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-purple-600 cursor-pointer"
          >
            Sign up
          </span>
        </p>

        {/* Bottom Legal Text */}
        <div className="text-xs text-gray-500 mt-6 space-y-2">
          <p>
            Having trouble logging in?{" "}
            <span className="text-purple-600 cursor-pointer">
              Learner help center
            </span>
          </p>
          <p>
            This site is protected by reCAPTCHA Enterprise and the Google Privacy
            Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
