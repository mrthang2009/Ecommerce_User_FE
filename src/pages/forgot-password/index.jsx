import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Head from "next/head";

import axiosClient from "@/libraries/axiosClient";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import IsLoadingSmall from "@/components/IsLoadingSmall";
import { Dialog, Transition } from "@headlessui/react";

function ForgotPassword() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isLinkDisabled, setIsLinkDisabled] = useState(false);

  const validation = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email: Không thể bỏ trống")
        .email("Email: giá trị không hợp lệ"),
      newPassword: yup
        .string()
        .required("Mật khẩu mới: không thể bỏ trống")
        .test(
          "newPassword type",
          "Mật khẩu mới: viết hoa ký tự đầu, mật khẩu ít nhất 8 ký tự, có ký tự đặc biệt",
          (value) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

            return passwordRegex.test(value);
          }
        )
        .test(
          "newPassword type",
          "Mật khẩu mới: không khớp với mật khẩu cũ",
          (value, context) => {
            if (context.parent.passwordOld) {
              return value !== context.parent.passwordOld;
            }
          }
        )
        .min(8)
        .max(20),

      confirmPassword: yup
        .string()
        .required("Nhập lại mật khẩu mới: không được bỏ trống")
        .test(
          "confirmPassword type",
          "Nhâp lại mật khẩu mới: không khớp với mật khẩu mới",
          (value, context) => {
            if (context.parent.newPassword) {
              return value === context.parent.newPassword;
            }
          }
        )
        .min(8)
        .max(20),
    }),

    onSubmit: async (values) => {
      try {
        setIsButtonDisabled(true);
        await axiosClient.post("/auth/send-code", {
          email: validation.values.email,
          forgotPassword: true,
        });
        router.push("/forgot-password");
        setShowVerificationModal(true);
        toast.warning("Vui lòng nhập mã xác thực được gửi đến email của bạn");
        setIsButtonDisabled(false);
      } catch (error) {
        console.error(error);
        setIsButtonDisabled(false);
        if (error.response) {
          // Lỗi trả về từ API
          const errorMessage = error.response.data.error;
          toast.error(errorMessage);
        } else {
          toast.error("Đăng ký người dùng thất bại");
        }
      }
    },
  });
  const handleResendCode = async () => {
    try {
      setIsLinkDisabled(true);
      await axiosClient.post("/auth/send-code", {
        email: validation.values.email,
        forgotPassword: true,
      });
      router.push("/forgot-password");
      setShowVerificationModal(true);
      toast.warning("Mã xác thực mới đã được gửi đến email của bạn.");
      setIsLinkDisabled(false);
    } catch (error) {
      console.error(error);
      setIsLinkDisabled(false);
      if (error.response) {
        // Lỗi trả về từ API
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Gửi lại mã xác thực thất bại. Vui lòng thử lại.");
      }
    }
  };
  // Thêm state để lưu trữ mã xác thực
  const [verificationCode, setVerificationCode] = useState("");
  // Hàm xử lý khi nhấn nút "Xác nhận" trong Dialog
  const handleVerificationSubmit = async () => {
    try {
      setIsButtonDisabled(true);
      // Gọi API xác thực email với mã xác thực từ state
      const response = await axiosClient.post("/auth/forgot-password", {
        email: validation.values.email,
        newPassword: validation.values.newPassword,
        confirmPassword: validation.values.confirmPassword,
        enteredCode: verificationCode,
      });
      if (!response.data.payload) {
        toast.error(response.data.message);
      } else {
        // Đóng Dialog sau khi xác thực thành công
        setShowVerificationModal(false);
        router.push("/login");
        // Hiển thị thông báo hoặc thực hiện các tác vụ khác sau khi xác thực
        toast.success("Đăng kí tài khoản thành công!");
      }
      setIsButtonDisabled(false);
    } catch (error) {
      setIsButtonDisabled(false);
      console.error(error);
      // Xử lý lỗi nếu có
      toast.error("Xác thực email thất bại. Vui lòng thử lại.");
    }
  };
  const hideEmail = (email) => {
    const atIndex = email.indexOf("@");

    if (atIndex > 1) {
      const visiblePart = email.substring(0, 1) + "*".repeat(atIndex - 1);
      const hiddenPart = email.substring(atIndex);
      return visiblePart + hiddenPart;
    } else {
      // Không có ký tự trước @ hoặc email không hợp lệ
      return email;
    }
  };
  return (
    <>
      <Head>
        <title>Đặt lại mật khẩu</title>
        <meta name="description" content="Thay đổi mật khẩu Jollibee" />
        <meta name="viewport" content="Đặt lại mật khẩu Jollibee" />
        <link rel="icon" href="/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className="flex items-center justify-center shadow-md bg-gray-100 py-8"
        style={{
          backgroundImage:
            "url('https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/Levinci_Widget/images/jollibee-kid-party-bg.png')",
          backgroundSize: "cover",
        }}
      >
        <form
          onSubmit={validation.handleSubmit}
          className="max-w-md w-3/4 mx-auto bg-white p-6 rounded-lg text-base md:text-lg lg:text-xl"
        >
          <h2 className="text-center text-red-600 uppercase text-lg lg:text-2xl xl:text-3xl">
            Đặt lại mật khẩu
          </h2>
          <div className="mb-4">
            <label htmlFor="passwordOld" className="block font-bold mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Vui lòng nhập email của bạn"
              name="email" // Sửa tên trường này thành "email"
              value={validation.values.email}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              autoComplete="off"
            />
          </div>
          {validation.errors.passwordOld && validation.touched.passwordOld && (
            <div className="text-red-500 mb-4">
              {validation.errors.passwordOld}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="newPassword" className="block font-bold mb-1">
              Mật khẩu mới:
            </label>
            <input
              type="password" // Sử dụng type="password" để ẩn mật khẩu
              id="newPassword"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Vui lòng nhập mật khẩu mới"
              name="newPassword"
              value={validation.values.newPassword}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              autoComplete="off" // Tắt gợi ý nhập
            />
          </div>
          {validation.errors.newPassword && validation.touched.newPassword && (
            <div className="text-red-500 mb-4">
              {validation.errors.newPassword}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold mb-1">
              Xác nhận mật khẩu mới:
            </label>
            <input
              type="password" // Sử dụng type="password" để ẩn mật khẩu
              id="confirmPassword"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder="Vui lòng nhập lại mật khẩu mới"
              name="confirmPassword"
              value={validation.values.confirmPassword}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              autoComplete="off" // Tắt gợi ý nhập
            />
          </div>
          {validation.errors.confirmPassword &&
            validation.touched.confirmPassword && (
              <div className="text-red-500 mb-4">
                {validation.errors.confirmPassword}
              </div>
            )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded w-full"
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? (
              <div className={`flex justify-center items-center gap-2`}>
                <IsLoadingSmall />
                <p>Lưu mật khẩu</p>
              </div>
            ) : (
              <p>Lưu mật khẩu</p>
            )}
          </button>
        </form>
        <Transition show={showVerificationModal} as={React.Fragment}>
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
                    className="text-lg text-gray-900 mb-4 text-center"
                    style={{
                      fontSize: "35px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    Xác thực email
                  </Dialog.Title>
                  <div className="mb-4">
                    <p style={{ fontSize: "30px" }}>
                      Mã xác thực đã được gửi đến email{" "}
                      {hideEmail(validation.values.email)}. Vui lòng nhập mã xác
                      thực email để hoàn thành đặt lại mật khẩu.
                    </p>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-500 "
                      style={{ fontSize: "166%", width: "40%" }}
                    />
                    <a
                      // className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      style={{
                        fontSize: "28px",
                        cursor: "pointer",
                        color: "#0861F2",
                      }}
                      onClick={handleResendCode}
                      disabled={isButtonDisabled}
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
                  </div>
                  <div className="text-center flex gap-5 justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-white hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={() => setShowVerificationModal(false)}
                      style={{ fontSize: "30px" }}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleVerificationSubmit}
                      style={{ fontSize: "30px" }}
                    >
                      {isButtonDisabled ? (
                        <div
                          className={`flex justify-center items-center gap-2`}
                        >
                          <IsLoadingSmall />
                          <p>Xác thực email</p>
                        </div>
                      ) : (
                        <p>Xác thực email</p>
                      )}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default ForgotPassword;
