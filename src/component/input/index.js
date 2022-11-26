import React from "react";
import styles from "./style.module.css"

export default function Input(props){
    return <input className={styles.container} placeholder={props.abc} onChange={props.onChange} value={props.value} />
}