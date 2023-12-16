import React from "react";
import Link from "next/link";
import styles from "./HomeWidgetMenu.module.css";

function HomeWidgetMenu() {
  return (
    <>
      <div className={styles.widget_today_menu_wrapper}>
        <div className={styles.today_menu_content}>
          <div className={`${styles.intro_wrapper}`}>
            <div className={styles.intro}>
              <div className={styles.logo}>
                <img
                  src="https://jollibee.com.vn/media/logo-footer.png"
                  alt="Jollibee"
                />
              </div>
              <p className={styles.title}>Ăn Gì Hôm Nay</p>
              <p className={styles.description}>
                Thực đơn Jollibee đa dạng và phong phú, có rất nhiều sự lựa chọn
                cho bạn, gia đình và bạn bè.
              </p>
            </div>
          </div>
          <div className={styles.main_menu_wrapper}>
            <div className={styles.quad_menu}>
              <WidgetTodayMenu
                hrefLink="/thuc-don/combo-ban-chay"
                srcTopImg="https://jollibee.com.vn/media/wysiwyg/today/ga_gion_vui_ve.png"
                srcBottomImg="https://jollibee.com.vn/media/e17856b74b7a0e-titlegagionvuive.png"
                alt="Jollibee gà rán ngon mỗi ngày"
              />
              <WidgetTodayMenu
                hrefLink="/thuc-don/ga-sot-cay"
                srcTopImg="https://jollibee.com.vn/media/wysiwyg/today/ga_sot_cay.png"
                srcBottomImg="https://jollibee.com.vn/media/0a7c5c03bdcaaf-titlegasotcay.png"
                alt="Jollibee gà rán ngon mỗi ngày"
              />

              <WidgetTodayMenu
                hrefLink="/thuc-don/mi-y-sot-bo-bam"
                srcTopImg="https://jollibee.com.vn/media/wysiwyg/today/my_y_sot_bo_bam.png"
                srcBottomImg="https://jollibee.com.vn/media/870d84c56fb2b9-titlemiysotbobam.png"
                alt="Jollibee gà rán ngon mỗi ngày"
              />

              <WidgetTodayMenu
                hrefLink="/thuc-don/mon-trang-mieng"
                srcTopImg="https://jollibee.com.vn/media/wysiwyg/today/mon_trang_mieng.png"
                srcBottomImg="https://jollibee.com.vn/media/3c96f92fbe5bc3-montrangmieng01.png"
                alt="Jollibee gà rán ngon mỗi ngày"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeWidgetMenu;

function WidgetTodayMenu({ hrefLink, srcTopImg, srcBottomImg, alt }) {
  return (
    <Link className={styles.quad} href={hrefLink}>
      <div className={styles.top_img_wrapper}>
        <img className={styles.top_img} src={srcTopImg} alt={alt} />
      </div>
      <div className={styles.bottom_img_wrapper}>
        <img className={styles.bottom_img} src={srcBottomImg} alt={alt} />
        <button className={styles.btn_bottom}>Đặt hàng</button>
      </div>
    </Link>
  );
}
