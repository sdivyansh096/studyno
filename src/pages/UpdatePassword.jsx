import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const [resetComplete, setresetComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div>
      {loading ? (
        <div class="custom-loader"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 ">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!resetComplete ? "Choose  new password" : "Reset complete!"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!resetComplete
              ? "Almost done. Enter your new password and youre all set."
              : `All done! We have sent an email to ${"nn"} to confirm`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!resetComplete && (
              <div>
                <div className=" relative mt-4">
                  <label class="w-full">
                    <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      New Password <sup class="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                    />
                  </label>
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible
                        fontSize={24}
                        fill="#AFB2BF"
                        color="white"
                        className=""
                      />
                    ) : (
                      <AiOutlineEye
                        fontSize={24}
                        fill="#AFB2BF"
                        color="white"
                      />
                    )}
                  </span>
                </div>
                <div className=" relative mt-4">
                  <label class="w-full">
                    <p class="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                      Confirm New Password <sup class="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                    />
                  </label>
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-10 z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible
                        fontSize={24}
                        fill="#AFB2BF"
                        color="white"
                        className=""
                      />
                    ) : (
                      <AiOutlineEye
                        fontSize={24}
                        fill="#AFB2BF"
                        color="white"
                      />
                    )}
                  </span>
                </div>
              </div>
            )}
            {!resetComplete ? (
              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              >
                Reset Password
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                  Return to login
                </button>
              </Link>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
