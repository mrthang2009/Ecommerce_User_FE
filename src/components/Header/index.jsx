import styles from "./Header.module.css";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Delivery from "../Delivery";
import HeaderLogo from "../HeaderLogo";
import NavigationBar from "../NavigationBar";
import { IoMenu } from "react-icons/io5";
import PanelHeader from "../PanelHeader";
import axiosClient from "@/libraries/axiosClient";
import useCustomer from "@/hooks/useCustomer";


function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // const [customer, setCustomer] = useState({});
  const customer = useCustomer((state) => state.customer);
  const setCustomer = useCustomer((state) => state.setCustomer);

  //Thực hiện khi tham số query parameters thay đổi thực hiện thay đổi.
  useEffect(() => {
    setShowNav(false);
  }, [router.asPath]);

  const handleShowNav = () => {
      setShowNav(!showNav);
  };

  //Chỉ gọi khi đăng nhập vào
  const getMe = useCallback(async (isLogin) => {
    try {
      if(isLogin === true){
        const res = await axiosClient.get("/customers");
        setCustomer(res.data?.payload || []);
      }
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  }, []);

  useEffect(() => {
    getMe(isLogin);
  }, [getMe, isLogin]);

  useEffect(() => {
    if (router.isReady) {
      const token = localStorage.getItem("TOKEN");
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
      //  isLogin === true set client sử dụng token
      // sử dụng !! sử dụng hai lần phủ định - sự thay đổi của token
      setIsLogin(!!token);
     
    }
  });

  //Chỉnh tắt navBar toggle với màn hình lg
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1025) {
        setShowNav(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  //Chỉnh fixed header khi scrolly >= 110
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 110) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.page_header} ${isFixed ? styles.fixed_header : ''}`}>
      <PanelHeader customer = {customer} isLogin = {isLogin}/>
      
      <div className="container mx-auto">
        <div className={`${styles.header_content}`}>
          <button
            onClick={handleShowNav}
            className="flex justify-center md:flex lg:hidden items-center"
          >
            <IoMenu size={"50px"} color="#F6F1E6" />
          </button>
          <HeaderLogo />
          <div className="hidden md:hidden lg:flex">
            <NavigationBar/>
          </div>
            <Delivery customer = {customer} isLogin = {isLogin}/>
        </div>
        {/* Build toggle */}
        {showNav && (
          <>
            <div className = {`flex md:flex lg:hidden`}>
              <NavigationBar showNav={showNav} />
            </div>
          </>
        )}
        {/* End build toggle */}
      </div>
    </header>
  );
}

export default Header;
