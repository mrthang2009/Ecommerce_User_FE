import React from "react";
import Link from "next/link";

import styles from "./BannerWelcome.module.css";

function BannerWelcome() {
  return (
    <>
        <div className={styles.banner_welcome}>
          <div className={styles.group_content_banner}>
            <div className={styles.content_banner_home}>
              <h3 className={styles.title}>Jollibee, xin chào</h3>
              <p className={styles.description}>
                Chúng tôi là Jollibee Việt Nam với hơn 100 cửa hàng trên khắp cả
                nước, chúng tôi mong muốn đem đến niềm vui ẩm thực cho mọi gia
                đình Việt bằng những món ăn có chất lượng tốt, hương vị tuyệt
                hảo, dịch vụ chu đáo với một mức giá hợp lý… Hãy đến và thưởng
                thức nhé!
              </p>
              <div className={styles.button_banner}>
                <Link
                  className={`${styles.btn_banner} ${styles.btn}`}
                  href="/thuc-don/combo-ban-chay"
                >
                  Đặt hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default BannerWelcome;
