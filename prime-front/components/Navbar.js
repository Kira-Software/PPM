import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/nav.module.css";
import { useRouter } from "next/router";


export default function Navbar() {
  const router = useRouter();

  const [openIcon, setOpenIcon] = useState(true);
  const handleclick = () => {
    setOpenIcon(!openIcon);
  };
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/logo.jpg" height={80} width={80} />{" "}
      </div>

      {openIcon && (
        <div className={styles.openicon}>
          <button onClick={handleclick}>
            <img src="/images/menu-bar.jpg" />
          </button>
        </div>
      )}

      {!openIcon && (
        <>
          <div className={styles.openicon}>
            <button onClick={handleclick}>
              <img src="/images/x-icon.png" />
            </button>
          </div>
          <nav className={styles.mobileList}>
            <ul>
              <li>
                {/* <Link href="/"><button>Home</button> </Link> */}
                <button onClick={() => router.push("/")}>Home</button> 
              </li>

              <li>
                {/* <Link href="/projects">Projects</Link> */}
                <button onClick={() => router.push("/projects")}>Projects</button> 

              </li>
              <li>
                {/* <Link href="/about"> About</Link> */}
                <button onClick={() => router.push("/about")}>About</button> 

              </li>
              <li>
                {/* <Link href="/contact">Contact</Link> */}
                <button onClick={() => router.push("/contact")}>Contact</button> 

              </li>
            </ul>
          </nav>
        </>
      )}

      <div className={styles.largeonlylist}>
        <ul>
          <li >
            <Link href="/" >Home</Link>
          </li>

          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/about"> About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
