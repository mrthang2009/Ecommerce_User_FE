import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className = {styles.page_footer}>
      <div className={`${styles.footer_content}`}>
        <div className={`${styles.footer_text} container mx-auto`}>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
            <div className={` ${styles.address}`}>
              <div className={styles.footer_logo}>
                <img
                  src="https://jollibee.com.vn/media/logo-footer.png"
                  alt="Jollibee"
                />
              </div>
              <div className={styles.info_address}>
                <p>Công ty trách nhiệm hữu hạn Jollibee Việt Nam</p>
                <p>Địa chỉ: 38 Yên Bái, Quận Hải Châu, Thành Phố Đà Nẵng</p>
                <p>Điện thoại: (028) 39309168</p>
                <p>
                  Tổng đài: 1900-1533
                </p>
                <p>Mã số thuế: 0303883266</p>
                <p>Ngày cấp: 15/07/2008 – Nơi cấp: Cục Thuế Hồ Chí Minh</p>
                <p>
                  Hộp thư góp ý:{" "}
                  <a href="mailto:jbvnfeedback@jollibee.com.vn">
                    jbvnfeedback@jollibee.com.vn
                  </a>
                </p>
              </div>
            </div>
            <div className={` p-3`}>
              <a href="tel:19001533">
                <img
                  className={styles.img_ship}
                  src="https://jollibee.com.vn/media/wysiwyg/delivery-lg_1.png"
                  alt="Jollibee giao hàng tận nơi"
                />
              </a>
              <ul className = {styles.list_page}>
                <li>
                  <a href="/">Liên hệ</a>
                </li>
                <li>
                  <a href="/">Chính sách và quy định chung</a>
                </li>
                <li>
                  <a href="/">Chính sách thanh toán khi đặt hàng</a>
                </li>
                <li>
                  <a href="/">Chính sách hoạt động</a>
                </li>
                <li>
                  <a href="/">Chính sách bảo mật thông tin</a>
                </li>
                <li>
                  <a href="/">Thông tin vận chuyển và giao nhận</a>
                </li>
                <li>
                  <a href="/">Thông tin đăng ký giao dịch chung</a>
                </li>
                <li>
                  <a href="/">Hướng dẫn đặt phần ăn</a>
                </li>
              </ul>
            </div>
            <div className={`p-3`}>
              <p className = {`text-uppercase ${styles.title}`}>Hãy liên kết với chúng tôi</p>
              <div className = {styles.block_social}>
                <a className = {styles.btn_icon} href="https://www.facebook.com/JollibeeVietnam" >
                  <img src="https://jollibee.com.vn/media/wysiwyg/icon-fb.png" alt="Facebook" />
                  <span className="text">Facebook </span>
                </a>
                <a className = {styles.btn_icon} href="mailto:jbvnfeedback@jollibee.com.vn">
                  <img src="https://jollibee.com.vn/media/wysiwyg/icon-mail.png" alt="Google mail"/>
                  <span className="text">E-Mail</span>
                </a>
              </div>
              <a href="http://online.gov.vn/Home/WebDetails/92800" target="_blank" rel="noopener">
                <img src="https://jollibee.com.vn/media/wysiwyg/bocongthuong.png" alt=""/>
              </a>
              <hr className={styles.hr}/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
