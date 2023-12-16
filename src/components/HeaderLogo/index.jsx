import Link from "next/link";
import styles from "./HeaderLogo.module.css";

function HeaderLogo(){
  return (
    <div className = {styles.logo_header}>
      <Link href="/">
        <img className = {styles.img} src="https://jollibee.com.vn/static/version1698938216/frontend/Jollibee/default/vi_VN/images/logo.png" title="Logo Jollibee" alt="Logo Jollibee" />
      </Link>
    </div>
  )
}

export default HeaderLogo