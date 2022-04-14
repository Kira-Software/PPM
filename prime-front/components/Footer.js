import React, { useState } from "react";
import styles from "../styles/footer.module.css";
import Link from "next/link";
import axios from "axios";

export default function Footer() {
  const [formdata, setformdata] = useState({
    email: "",
    message: "",
  });

  const [response, setresponse] = useState("");

  const changer = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  async function handlesubmitform(e) {
    // e.preventDefault();
    setresponse("Loading ...");

    console.log("formdata value is ", formdata);
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        // "x-auth-token": localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:7000/api/contact",
        formdata,
        {
          withCredentials: true,
          config,
        }
      );
      console.log(res);
      setresponse(res.data.message);
      // setformdata({...formdata, email: "", message: "" });
    } catch (err) {
      console.error("the error is ", err.message);
    }
  }
  return (
    <div className={styles.footer}>
      <div className={styles.contact}>
        <h3>Contact Us</h3>
        <form onSubmit={handlesubmitform}>
          <input
            type="email"
            name="email"
            onChange={(e) => changer(e)}
            required
            placeholder="email"
          />
          <br /> <br />
          <textarea
            type="text"
            name="message"
            onChange={(e) => changer(e)}
            required
            placeholder="message"
          />
          <br /> <br />
          <input type="submit" value="Submit" />{" "}
        </form>
      </div>

      <div className={styles.links}>
        <ul>
          <li>
            <Link href="/">Home</Link>
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
      <div className={styles.socialmedia}>
        <h3>Get in Touch</h3>
        <div className={styles.icons}>
          <a href="https://www.facebook.com/kale2112/">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781175/fb_g4mvrg.png" />
          </a>
          <a href="#">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781178/telegramlogo_nabnin.png" />
          </a>

          <a href="https://www.instagram.com/kirubel_girmay/">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781179/Insta3_uhhfqm.png" />
          </a>
        </div>
      </div>

      <div className={styles.address}>
        <br />
        <span>
          <a href="tel: +251904999993">+251 9049 99993</a>
        </span>{" "}
        <br /> <br />
        <span>
          <a href="tel: +251904999994">+251 116 662 313</a>
        </span>{" "}
        <br /> <br />
        <span>
          <a href="mailto: primepropertyaa@gmail.com?subject=Feedback">
            primepropertyaa@gmail.com
          </a>
        </span>
      </div>

      <div className={styles.copyright}>
        <p>&copy;2022 | Prime Properties | All rights reserved.</p>
      </div>
    </div>
  );
}
