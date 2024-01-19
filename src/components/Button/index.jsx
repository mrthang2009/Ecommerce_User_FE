import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";
const Button = ({ href, nameButton }) => {
  return (
    <Link className={styles.button} href={href}>
      {nameButton}
    </Link>
  );
};

export default Button;
