import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.page_footer}>
      <div className="container mx-auto">
        <div className="text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-10">
            <div>
              <img
                className="w-20 mb-5"
                src="https://jollibee.com.vn/media/logo-footer.png"
                alt="Jollibee"
              />
              <div className="leading-10">
                <p className="uppercase">Công ty TNHH Jollibee Việt Nam</p>
                <p>Địa chỉ: 38 Yên Bái, Quận Hải Châu, Thành Phố Đà Nẵng</p>
                <p>Điện thoại: (028) 39309168</p>
                <p>Tổng đài: 1900-1533</p>
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
            <div>
              <a href="tel:19001533">
                <img
                  src="https://jollibee.com.vn/media/wysiwyg/delivery-lg_1.png"
                  alt="Jollibee giao hàng tận nơi"
                />
              </a>
              <ul className="leading-10 mt-5">
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
            <div>
              <p className="text-uppercase text-4xl font-bold uppercase mb-5">
                Hãy liên kết với chúng tôi
              </p>
              <a
                className="flex items-start mb-5"
                href="https://www.facebook.com/mittothang.98/"
              >
                <img
                  src="https://jollibee.com.vn/media/wysiwyg/icon-fb.png"
                  alt="Facebook"
                />
                <span className="text ml-3">Facebook </span>
              </a>
              <a
                className="flex items-start mb-5"
                href="mailto:jbvnfeedback@jollibee.com.vn"
              >
                <img
                  src="https://jollibee.com.vn/media/wysiwyg/icon-mail.png"
                  alt="Google mail"
                />
                <span className="text ml-3">E-Mail</span>
              </a>
              <a
                href="http://online.gov.vn/Home/WebDetails/92800"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="https://jollibee.com.vn/media/wysiwyg/bocongthuong.png"
                  alt=""
                />
              </a>
              <hr className="mt-10" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
