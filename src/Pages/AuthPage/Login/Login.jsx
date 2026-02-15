import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  // console.log(location);
  const { signInUser, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const handleLogin = (data) => {
    setLoading(true);
    signInUser(data.email, data.password)
      .then(() => {
        navigate(location.state || "/");
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${err.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setLoading(false);
      });
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
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="card w-full max-w-md shadow-xl rounded-2xl p-8 md:p-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-6">
            Login Now!
          </h1>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="space-y-4">
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
                    Password must contain uppercase, lowercase, special
                    character, and minimum 6 characters
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="text-sm  hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button className="btn btn-primary w-full mt-4 rounded-lg focus:outline-none focus:border-gray-600 hover:bg-secondary hover:text-white">
                Login
              </button>
            </fieldset>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-700">
            Don't have any account?{" "}
            <Link
              to="/authentication/register"
              className=" font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Social Login */}
          <div className="mt-4">
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
