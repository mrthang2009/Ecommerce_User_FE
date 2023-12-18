import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axiosClient from "../../libraries/axiosClient";
import IsLoadingSmall from "../IsLoadingSmall";
import { Dialog, Transition } from "@headlessui/react";
function RegisterContent() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const validation = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      enteredCode: "",
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("Họ: Không thể bỏ trống")
        .max(50, "Họ: Không thể vượt quá 50 ký tự"),
      lastName: yup
        .string()
        .required("Tên: Không thể bỏ trống")
        .max(50, "Tên: Không thể vượt quá 50 ký tự"),
      email: yup
        .string()
        .required("Email: Không thể bỏ trống")
        .email("Email: giá trị không hợp lệ"),
      password: yup
        .string()
        .required("Mật khẩu: Không thể bỏ trống")
        .test(
          "Kiểu mật khẩu",
          "Mật khẩu: Giá trị không hợp lệ, ít nhất 8 ký tự, viết hoa chữ cái đầu, có ký tự đặc biệt",
          (value) => {
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            return passwordRegex.test(value);
          }
        )
        .min(8)
        .max(20),
      phoneNumber: yup
        .string()
        .required("Số điện thoại: không thể bỏ trống")
        .test("Kiểu số điện thoại", "Số điện thoại không hợp lệ", (value) => {
          const phoneRegex =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
          return phoneRegex.test(value);
        }),
      // enteredCode: yup
      //   .string()
      //   .required("Vui lòng nhập mã xác thực gồm 6 chữ số được gửi về gmail của bạn")
      //   .matches(
      //     /^\d{6}$/,
      //     "Mã xác thực: Gồm 6 chữ số được gửi đến gmail của bạn"
      //   ),
    }),
    onSubmit: async (values) => {
      try {
        setIsButtonDisabled(true);
        await axiosClient.post("/auth/register", values);
        router.push("/register");
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
  // Thêm state để lưu trữ mã xác thực
  const [verificationCode, setVerificationCode] = useState("");
  // Hàm xử lý khi nhấn nút "Xác nhận" trong Dialog
  const handleVerificationSubmit = async () => {
    try {
      // Gọi API xác thực email với mã xác thực từ state
      await axiosClient.post("/auth/verify", {
        firstName: validation.values.firstName,
        lastName: validation.values.lastName,
        email: validation.values.email,
        phoneNumber: validation.values.phoneNumber,
        password: validation.values.password,
        enteredCode: verificationCode,
      });
      if (!response.data.payload) {
        toast.error(response.data.message);
      } else {
        // Đóng Dialog sau khi xác thực thành công
        setShowVerificationModal(false);
        router.push("/");
        // Hiển thị thông báo hoặc thực hiện các tác vụ khác sau khi xác thực
        toast.success(
          "Xác thực email thành công! Đăng kí tài khoản thành công!"
        );
      }
    } catch (error) {
      console.error(error);
      // Xử lý lỗi nếu có
      toast.error("Xác thực email thất bại. Vui lòng thử lại.");
    }
  };
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
        <h2 className="text-4xl font-semibold mb-6 text-center">Đăng ký</h2>
        <form onSubmit={validation.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-bold">Họ</label>
              <input
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
                type="text"
                placeholder="Vui lòng nhập họ"
                name="firstName"
                value={validation.values.firstName}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.errors.firstName && validation.touched.firstName && (
                <div className="text-red-500 mt-1">
                  {validation.errors.firstName}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-bold">Tên</label>
              <input
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
                type="text"
                placeholder="Vui lòng nhập tên"
                name="lastName"
                value={validation.values.lastName}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
              />
              {validation.errors.lastName && validation.touched.lastName && (
                <div className="text-red-500 mt-1">
                  {validation.errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-bold">Email</label>
            <input
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
              type="email"
              placeholder="Vui lòng nhập email"
              name="email"
              value={validation.values.email}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
            />
            {validation.errors.email && validation.touched.email && (
              <div className="text-red-500 mt-1">{validation.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-bold">
              Mật khẩu
            </label>
            <input
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
              type="password"
              placeholder="Vui lòng nhập mật khẩu"
              name="password"
              value={validation.values.password}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
            />
            {validation.errors.password && validation.touched.password && (
              <div className="text-red-500 mt-1">
                {validation.errors.password}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-bold">
              Số điện thoại
            </label>
            <input
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
              type="text"
              placeholder="Vui lòng nhập số điện thoại"
              name="phoneNumber"
              value={validation.values.phoneNumber}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
            />
            {validation.errors.phoneNumber &&
              validation.touched.phoneNumber && (
                <div className="text-red-500 mt-1">
                  {validation.errors.phoneNumber}
                </div>
              )}
          </div>
          {/* <div>
            <label className="block mb-1 text-gray-700 font-bold">
              Mã xác thực
            </label>
            <input
              className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 text-gray-700"
              type="text"
              placeholder="Vui lòng nhập mã xác thực"
              name="enteredCode"
              value={validation.values.enteredCode}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
            />
            {validation.errors.enteredCode &&
              validation.touched.enteredCode && (
                <div className="text-red-500 mt-1">
                  {validation.errors.enteredCode}
                </div>
              )}
          </div> */}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-400 text-white rounded-lg py-2 px-4 w-full"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? (
                <div className={`flex justify-center items-center gap-2`}>
                  <IsLoadingSmall />
                  <p>Đăng ký</p>
                </div>
              ) : (
                <p>Đăng ký</p>
              )}
            </button>
          </div>
        </form>
        {/* <Transition show={showVerificationModal} as={React.Fragment}>
          <Dialog
            onClose={() => setShowVerificationModal(false)}
            className="fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:opacity-100"
                enterTo="opacity-100 translate-y-0 sm:opacity-100 sm:translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:opacity-100 sm:translate-y-0"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0"
              >
                <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Xác thực email
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>
                      Nhập mã xác thực được gửi đến email{" "}
                      <strong style={{ color: "#FFC522" }}>
                        {validation.values.email}
                      </strong>
                    </p>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      // onClick={() => setShowVerificationModal(false)}
                      onClick={handleVerificationSubmit}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition> */}
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
                    className="text-lg font-medium text-gray-900 mb-4"
                    style={{ fontSize: "35px" }}
                  >
                    Xác thực email
                  </Dialog.Title>
                  <div className="mb-4">
                    <p style={{ fontSize: "30px" }}>
                      Nhập mã xác thực được gửi đến email{" "}
                      <strong className="text-yellow-500">
                        {validation.values.email}
                      </strong>
                    </p>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="mt-2 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-500"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={handleVerificationSubmit}
                      style={{ fontSize: "30px" }}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default RegisterContent;
