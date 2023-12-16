import axiosClient from '@/libraries/axiosClient';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const withTokenCheckComponent = (WrappedComponent, redirectPage) => {
  return (props) => {
    const router = useRouter();
 // Lấy token từ local storage hoặc nơi lưu trữ khác
    
    useEffect(() => {
      const token = localStorage.getItem("TOKEN");
      // Kiểm tra xem token có tồn tại trong localStorage hay không
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;

      if (!token) {
        if (redirectPage) {
          router.push(redirectPage); // Chuyển hướng đến trang login hoặc trang khác tùy chọn
          toast.error("Vui lòng đăng nhập");
        } else {
          router.push("/login"); // Chuyển hướng đến trang login hoặc trang khác tùy chọn
          toast.error("Vui lòng đăng nhập");
        }
      }
    }, [redirectPage]);

    return <WrappedComponent {...props} />;
  };
};

export default withTokenCheckComponent;
