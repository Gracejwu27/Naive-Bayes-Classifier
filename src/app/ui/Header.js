'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; 
import styles from './Header.module.css'; // Adjust the path to your CSS module file

export default function Header() {

    return (
        <nav className={styles.navbar}>
         <div className={styles.navbarStart}>
            <Link href = "#home">
                    <h2> Text Classifier </h2> 
            </Link>
         </div>
         <div className={styles.navbarEnd}> 
            <Link href="#about">
                    <h2>About</h2>
            </Link>
         </div> 
         <div className = {styles.navbarEnd}>
            <Link href="#howToUse">
                    <h2>How to use it</h2>
            </Link>
         </div>
         <div className={styles.navbarEnd}> 
            <Link href="#explain">
                    <h2>Explanation</h2>
            </Link>
         </div> 
        </nav>
    );
}