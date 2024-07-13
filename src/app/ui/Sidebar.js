'use client';
import React from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar(){
    const pathname = usePathname(); 
    return(
        <>
        <nav className={styles.navbar}>
            <Link href = "/"
            className={clsx({
                [styles.active]: pathname === "/",
                [styles.navbarLink] : pathname !== "/"
            })}
            >
                <p> Sentiment Analysis </p> 
            </Link>

            <Link href = "/emotion"
            className={clsx({
                [styles.active]: pathname === "/emotion",
                [styles.navbarLink] : pathname !== "/emotion"

            })}>
                    <p> Emotion Analysis</p> 
            </Link>
            <Link href = "/train"
            className={clsx({
                [styles.active]: pathname === "/train",
                [styles.navbarLink] : pathname !== "/train"

            })}>
                    <p> Train your own (file) </p> 
            </Link>
            <Link href = "/userTrain"
            className={clsx({
                [styles.active]: pathname === "/userTrain",
                [styles.navbarLink] : pathname !== "/userTrain"

            })}>
                    <p> Train your own (text)</p> 
            </Link>
        </nav>
        </>
    )
}