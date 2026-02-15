import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUserProfile, resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    setLoading(true);
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(() => {
        //store the profile img
        const formData = new FormData();
        formData.append("image", profileImg);

        //get the url
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_img_host_key
        }`;

        axios.post(image_Api_Url, formData).then((res) => {
          const photo = res.data.data.url;

          //update profile
          const userProfile = {
            displayName: data.name,
            photoURL: photo,
          };

          updateUserProfile(userProfile).then(() => {
            const user = {
              displayName: data.name,
              photoURL: photo,
              email: data.email,
            };
            axiosInstance.post("/users", user).then((res) => {
              if (res.data.insertedId) {
                navigate("/");
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Registered Successfullly",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setLoading(false);
              }
            });
          });
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // console.log(data);
  };

  const handleResetPassword = () => {
    const email = getValues("email");
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Please enter your email first",
      });
    }

    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password reset email sent!",
          text: "Check your inbox for further instructions.",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="card w-full max-w-md shadow-xl rounded-2xl p-8 md:p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-6">
          Register Now!
        </h1>

        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full mt-1 rounded-lg  focus:outline-none focus:border-gray-600"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 mt-1">Name is required</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Photo
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full mt-1 rounded-lg focus:outline-none focus:border-gray-600"
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <p className="text-red-500 mt-1">Photo is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full mt-1 rounded-lg focus:outline-none focus:border-gray-600"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input input-bordered w-full pr-12 rounded-lg focus:outline-none focus:border-gray-600"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+]).{6,}$/,
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 mt-1 text-sm">
                  Password must contain uppercase, lowercase, special character,
                  and minimum 6 characters
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-sm text-secondary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Register Button */}
            <button className="btn btn-primary w-full mt-4 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-secondary hover:text-white">
              Register
            </button>
          </fieldset>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/authentication/login"
            className="text-secondary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Social Login */}
        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
