import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

// import InputGroup from "./InputGroup";
import axiosClient from "../../libraries/axiosClient";
import IsLoadingSmall from "../IsLoadingSmall";

function LoginContent() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
          {/* <InputGroup
            label="Email"
            type="email"
            name="email"
            validation={validation}
          />

          <InputGroup
            label="Mật khẩu"
            type="password"
            name="password"
            validation={validation}
          /> */}

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
            <label className="block mb-1 text-gray-700 font-bold">Mật khẩu:</label>
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
      </div>
    </div>
  );
}

export default LoginContent;
