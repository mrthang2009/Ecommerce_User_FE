import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
// import { Dialog, Transition } from "@headlessui/react";

import axiosClient from "../../libraries/axiosClient";
import IsLoadingSmall from "../IsLoadingSmall";

function LoginContent() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [showVerificationModal, setShowVerificationModal] = useState(false);

  const validation = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email: Không thể bỏ trống")
        .email("Email: giá trị không hợp lệ"),

      password: yup.string().required("Mật khẩu: Không thể bỏ trống"),
    }),

    onSubmit: async (values) => {
      try {
        setIsButtonDisabled(true);
        const res = await axiosClient.post("/auth/login", values);
        const { token, refreshToken } = res.data;

        window.localStorage.setItem("TOKEN", token);
        window.localStorage.setItem("REFRESH_TOKEN", refreshToken);
        axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
        if (token) {
          router.push("/");
          toast.success("Đăng nhập thành công");
        }
      } catch (error) {
        console.error(error);
        toast.error("Thông tin đăng nhập không chính xác. Vui lòng thử lại.");
        setIsButtonDisabled(false);
      }
    },
  });
  // const [isLinkDisabled, setIsLinkDisabled] = useState(false);
  // const handleResendCode = async () => {
  //   try {
  //     setIsLinkDisabled(true);
  //     await axiosClient.post("/auth/send-code", {
  //       email: validation.values.email,
  //       forgotPassword: true,
  //     });
  //     router.push("/login");
  //     setShowVerificationModal(true)
  //     toast.warning("Vui lòng nhập mã xác thực đã được gửi đến email của bạn");
  //     setIsLinkDisabled(false);
  //   } catch (error) {
  //     console.error(error);
  //     setIsLinkDisabled(false);
  //     if (error.response) {
  //       // Lỗi trả về từ API
  //       const errorMessage = error.response.data.error;
  //       toast.error(errorMessage);
  //     } else {
  //       toast.error("Gửi lại mã xác thực thất bại. Vui lòng thử lại.");
  //     }
  //   }
  // };
  return (
    <div
      className="flex justify-center items-center bg-gray-100 p-10"
      style={{
        backgroundImage:
          "url('https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/Levinci_Widget/images/jollibee-kid-party-bg.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-lg md:text-lg lg:text-2xl">
        <h2 className="text-4xl font-semibold mb-6 text-center">Đăng nhập</h2>
        <form onSubmit={validation.handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-bold">Email:</label>
            <input
              type="email"
              placeholder="Vui lòng nhập email"
              name="email"
              value={validation.values.email}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
            />
            {validation.errors.email && validation.touched.email && (
              <div className="text-red-500 mt-1">{validation.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-bold">
              Mật khẩu:
            </label>
            <input
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              name="password"
              value={validation.values.password}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
            />
            {validation.errors.password && validation.touched.password && (
              <div className="text-red-500 mt-1">
                {validation.errors.password}
              </div>
            )}
          </div>
          <Link
            href="forgot-password"
            style={{
              cursor: "pointer",
              color: "#FFC522",
            }}
            // onClick={() => setShowVerificationModal(true)}
          >
            Quên mật khẩu?
          </Link>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-400 text-white rounded-lg py-2 px-4 w-full"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? (
              <div className={`flex justify-center items-center gap-2`}>
                <IsLoadingSmall />
                <p>Đăng nhập</p>
              </div>
            ) : (
              <p>Đăng nhập</p>
            )}
          </button>

          <div className="flex justify-center gap-x-1">
            <p>Đăng ký tài khoản mới</p>
            <Link href="/register" className="text-blue-500">
              tại đây
            </Link>
          </div>
        </form>
        {/* <Transition show={showVerificationModal} as={React.Fragment}>
          <Dialog
            onClose={() => setShowVerificationModal(false)}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:opacity-100"
                enterTo="opacity-100 translate-y-0 sm:opacity-100 sm:translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:opacity-100 sm:translate-y-0"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0"
              >
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                  <Dialog.Title
                    className="text-lg font-medium text-gray-900 mb-4"
                    style={{ fontSize: "35px" }}
                  >
                    Xác thực tài khoản
                  </Dialog.Title>
                  <div>
                    <label className="block mb-1 text-gray-700 font-bold">
                      Email:
                    </label>
                    <input
                      type="email"
                      placeholder="Vui lòng nhập email"
                      name="email"
                      value={validation.values.email}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
                    />
                    {validation.errors.email && validation.touched.email && (
                      <div className="text-red-500 mt-1">
                        {validation.errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 font-bold">
                      Mã xác thực:
                    </label>
                    <input
                      type="text"
                      placeholder="Vui lòng nhập mã xác thực"
                      // value={validation.values.email}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
                    />
                    {validation.errors.email && validation.touched.email && (
                      <div className="text-red-500 mt-1">
                        {validation.errors.email}
                      </div>
                    )}
                  </div>
                  <a
                      style={{
                        fontSize: "28px",
                        cursor: "pointer",
                        color: "#0861F2",
                      }}
                      onClick={handleResendCode}
                      disabled={isLinkDisabled}
                    >
                      {isLinkDisabled ? (
                        <div className="flex items-center gap-2">
                          <IsLoadingSmall />
                          <p>Gửi lại mã xác thực</p>
                        </div>
                      ) : (
                        <p>Gửi lại mã xác thực</p>
                      )}
                    </a>
                  <div className="text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      // onClick={handleVerificationSubmit}
                      style={{ fontSize: "30px" }}
                    >
                      {isButtonDisabled ? (
                        <div
                          className={`flex justify-center items-center gap-2`}
                        >
                          <IsLoadingSmall />
                          <p>Xác thực tài khoản</p>
                        </div>
                      ) : (
                        <p>Xác thực tài khoản</p>
                      )}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition> */}
      </div>
    </div>
  );
}

export default LoginContent;
