import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/contact.module.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
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

  let rescolor =
    response === "success" ? "green" : response === "failed" ? "red" : null;
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="prime properties marketing contact page "
        />
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      <Navbar />

      <div className={styles.title}>
        <h1>Contact Us</h1>
      </div>

      <div className={styles.top}>
        <h1>Contact</h1>
        <p>
          Don’t hesitate to reach out with the contact information below. Thank
          you!
        </p>
      </div>

      <div className={styles.left}>
        <h1>Get in Touch</h1>
        <div className={styles.icons}>
          <a href="https://www.facebook.com/kirubel.girmaye/">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781175/fb_g4mvrg.png" />
          </a>
          <a href="https://www.linkedin.com/in/kirubel-girmay-886966175/">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781175/linkedinlogo_lwzvrm.png" />
          </a>
          <a href="https://t.me/Someeeee1">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781178/telegramlogo_nabnin.png" />
          </a>

          <a href="https://twitter.com/Kirubel__G">
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781175/twitter_kzxsvc.png" />
          </a>

          <a href="https://github.com/Kira-Software">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781175/GitHub-Mark_hsd3h3.png" />
          </a>

          <a href="https://www.instagram.com/kirubel_girmay/">
            {" "}
            <img src="https://res.cloudinary.com/dh6muae8v/image/upload/v1640781179/Insta3_uhhfqm.png" />
          </a>
        </div>
      </div>

      <div className={styles.right}>
        <form onSubmit={handlesubmitform}>
          {/* <h1>Contact Us</h1> */}
          {/* <label>
            <strong>Name</strong> (required)
          </label>
          <br />
          <input
            type="text"
            name="name"
            onChange={(e) => changer(e)}
            required
          /> */}
          <p style={{ color: rescolor }}>{response}</p>
          <br />
          <label>
            <strong>Email</strong> (required)
          </label>
          <br />
          <input
            type="email"
            name="email"
            onChange={(e) => changer(e)}
            required
          />
          <br />
          <label>
            <strong>Message</strong> (required)
          </label>
          <br />
          <textarea
            type="text"
            name="message"
            onChange={(e) => changer(e)}
            required
          />
          <br /> <br />
          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
