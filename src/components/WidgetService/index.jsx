import React from "react";
import styles from "./WidgetService.module.css";
import Link from "next/link";

function WidgetService() {
  return (
    <div className={styles.widget_service_wrapper}>
      <div className={styles.title_wrapper}>
        <p className={styles.title}>Dịch vụ</p>
        <p className={styles.description}>
          Tận hưởng những khoảnh khắc trọn vẹn cùng Jollibee
        </p>
      </div>
      <div className={styles.content_service}>
        <Service_Entry
          href="/thuc-don/combo-ban-chay"
          srcImg="https://jollibee.com.vn/media/3478848e-3b8f-45f8-bc64-32e112922a8b.png"
          alt="Jollibee ăn gà rán ngon"
          contentMedia="Lấy tại cửa hàng"
          contentAction="Xem thêm"
        />

        <Service_Entry
          href="/dich-vu"
          srcImg="https://jollibee.com.vn/media/2_1.png"
          alt="Jollibee ăn gà rán ngon"
          contentMedia="Đặt tiệc sinh nhật"
          contentAction="Xem thêm"
        />

        <Service_Entry
          href="/dich-vu"
          srcImg="https://jollibee.com.vn/media/club.png"
          alt="Jollibee ăn gà rán ngon"
          contentMedia="Jollibee kid club"
          contentAction="Xem thêm"
        />

        <Service_Entry
          href="/thuc-don/combo-ban-chay"
          srcImg="https://jollibee.com.vn/media/4_1.png"
          alt="Jollibee ăn gà rán ngon"
          contentMedia="Đặt hàng lớn"
          contentAction="Xem thêm"
        />
      </div>
    </div>
  );
}

export default WidgetService;

function Service_Entry({ href, srcImg, alt, contentMedia, contentAction }) {
  return (
    <div className={styles.service_entry}>
      <div className={`${styles.media}`}>
        <Link className={styles.media_center} href={href}>
          <img className={styles.img} src={srcImg} alt={alt} />
        </Link>
        <div className={`${styles.media_content} hidden md:hidden lg:block`}>
          <h4 className={styles.media_heading}>{contentMedia}</h4>
          <Link className={styles.action} href={href}>
            {contentAction}
          </Link>
        </div>
      </div>
    </div>
  );
}
