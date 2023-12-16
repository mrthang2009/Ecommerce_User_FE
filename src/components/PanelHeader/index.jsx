import React from "react";
import Link from "next/link";
import { BiMap } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";

import styles from "./PanelHeader.module.css";
import DropDownInfo from "./DropDownInfo";

function PanelHeader({customer, isLogin}) {

  return (
    <>
      <div className={`${styles.wrapper_panel}`}>
        <div className= {`${styles.wrapper_panel_content} text-base md:text-lg lg:text-2xl`}>
          <div>
            <img
              src="https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/en_US/images/bg-header.png"
              alt=""
            />
          </div>
          <div className={`${styles.header_panel}`}>
            <div className={styles.language}>
              <div className={styles.language_original}>
                <img
                  className={styles.img}
                  src="https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/images/flag-vn.png"
                  alt="Việt Nam"
                />
                <strong>VN</strong>
              </div>
              <strong>|</strong>
              <div className={styles.language_foreign}>
                <img
                  className={styles.img}
                  src="https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/images/flag-en.png"
                  alt="Việt Nam"
                />
                <strong>EN</strong>
              </div>
            </div>
            <div className={styles.switcher}>
              <BiMap size="2rem" />
              <strong>
                {isLogin && customer.provinceName
                  ? customer.provinceName
                  : "Tỉnh thành"}
              </strong>
            </div>
            <div className={styles.header_register}>
              <MdAccountCircle size="2rem" />
              <ul className={styles.wrap_register}>
                {isLogin ? (
                  <>
                    <li>
                      <DropDownInfo customer={customer} />
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/register">Đăng kí</Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link href="/login">Đăng nhập</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PanelHeader;
