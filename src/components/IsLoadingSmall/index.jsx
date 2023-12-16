import React from 'react';
import styles from "./IsLoadingSmall.module.css"

function IsLoadingSmall() {
  return (
    <div className={`${styles.lds_spinner}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
     )
}

export default IsLoadingSmall;