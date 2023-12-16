import RegisterContent from "@/components/RegisterContent";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function Register() {
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
        <title>Đăng ký</title>
        <meta name="description" content="Đăng ký Jollibee" />
        <meta name="viewport" content="Đăng ký Jollibee" />
        <link rel="icon" href="/logo.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {isLogin ? null : <RegisterContent />}
    </>
  );
}
export default Register;
