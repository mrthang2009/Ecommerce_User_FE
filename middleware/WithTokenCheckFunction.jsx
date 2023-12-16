import axiosClient from "@/libraries/axiosClient";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const withTokenCheckFunction = (func, redirectPage) => {
  const router = useRouter();
  return async (...args) => {
    // Kiểm tra xem token có tồn tại trong localStorage hay không
    const token = localStorage.getItem("TOKEN"); // Lấy token từ local storage hoặc nơi lưu trữ khác
    axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
    if (!token) {
        if(redirectPage){
            router.push(redirectPage); // Chuyển hướng đến trang login hoặc trang khác tùy chọn
            toast.error("Vui lòng đăng nhập");
        }else{
            router.push("/login"); // Chuyển hướng đến trang login hoặc trang khác tùy chọn
            toast.error("Vui lòng đăng nhập");
        }
      return null;
    }

    // Thực hiện hàm được bọc nếu có token
    return await func(...args);
  };
};

export default withTokenCheckFunction;


