import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Head from "next/head";

import LoginContent from "@/components/LoginContent";

function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setIsLogin(true);
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập Jollibee" />
        <meta name="viewport" content="Đăng nhập Jollibee" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLogin ? null : <LoginContent />}
    </>
  );
}

export default Login;