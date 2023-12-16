import React from 'react'
import styles from './IsLoading.module.css'

function IsLoading() {
  return (
    <div className={`${styles.lds_spinner}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  )
}

export default IsLoading;