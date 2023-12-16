import React from 'react'


import styles from "./Delivery.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { MdAccountCircle } from "react-icons/md";
import DropDownInfo from '../PanelHeader/DropDownInfo';

function Delivery({customer, isLogin}) {
  return (
    <div className={`${styles.wrap_delivery}`}>

        <Link href={"/thuc-don/combo-ban-chay"}>
            <div className={styles.pick_up}>
                Pick up
            </div>
        </Link>
        <a href="tel:0326898018" className='hidden md:hidden lg:flex'>
          <Image width={100} height={30}src={"https://jollibee.com.vn/media/wysiwyg/delivery-lg-rs.png"} alt="Giao hàng nhanh jollibee" />
        </a>
        <div className={`${styles.delivery_register} flex md:flex lg:hidden`}>
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
  )
}

export default Delivery