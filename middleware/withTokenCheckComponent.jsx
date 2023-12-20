import axiosClient from "@/libraries/axiosClient";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import decodeToken from "@/libraries/tokenDecoding";

const withTokenCheckComponent = (WrappedComponent, redirectPage) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAndRefreshToken = async () => {
        let token = localStorage.getItem("TOKEN");
        let refreshToken = localStorage.getItem("REFRESH_TOKEN");

        if (!token) {
          if (redirectPage) {
            router.push(redirectPage);
          } else {
            router.push("/login");
          }
        } else {
          const decodedPayloadToken = decodeToken(token);
          const decodedPayloadRefreshToken = decodeToken(refreshToken);
          if (decodedPayloadToken.exp < Date.now() / 1000) {
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
              if (redirectPage) {
                router.push(redirectPage);
              } else {
                router.push("/login");
              }
              localStorage.removeItem("TOKEN");
              localStorage.removeItem("REFRESH_TOKEN");
              toast.error("Phiên đăng nhập hết hạng vui lòng đăng nhập lại");
            }
          } else {
            axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
          }
        }
      };

      checkAndRefreshToken();
    }, [redirectPage]);

    return <WrappedComponent {...props} />;
  };
};

export default withTokenCheckComponent;
