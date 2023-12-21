import axiosClient from "@/libraries/axiosClient";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import decodeToken from "@/libraries/tokenDecoding";

const withTokenCheckComponent = (WrappedComponent, redirectPage) => {
  return (props) => {
    const router = useRouter();

    const checkAndRefreshToken = async () => {
      const token = localStorage.getItem("TOKEN");
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      if (!token) {
        handleTokenNotFound();
      } else {
        const decodedPayloadToken = decodeToken(token);
        if (decodedPayloadToken.exp < Date.now() / 1000) {
          await handleTokenExpiration(refreshToken);
        } else {
          axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
        }
      }
    };

    const handleTokenNotFound = () => {
      if (redirectPage) {
        router.push(redirectPage);
      } else {
        router.push("/login");
      }
      toast.error("Vui lòng đăng nhập");
    };

    const handleTokenExpiration = async (refreshToken) => {
      if (!refreshToken) {
        handleTokenNotFound();
        return;
      }
      const decodedPayloadRefreshToken = decodeToken(refreshToken);
      if (decodedPayloadRefreshToken.exp >= Date.now() / 1000) {
        try {
          const res = await axiosClient.post(`auth/refesh-token`, {
            refreshToken,
          });

          const newToken = res.data.token;
          localStorage.setItem("TOKEN", newToken);
          axiosClient.defaults.headers.Authorization = `Bearer ${newToken}`;
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      } else {
        handleTokenNotFound();
        localStorage.removeItem("TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      }
    };

    useEffect(() => {
      checkAndRefreshToken();
    }, [redirectPage]);

    return <WrappedComponent {...props} />;
  };
};

export default withTokenCheckComponent;
