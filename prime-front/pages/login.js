import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import authContext from "../Context/AuthUserContext";

export default function login() {
  const router = useRouter();
  const { setAuthenticated } = useContext(authContext);

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const [loginmessage, setLoginMessage] = useState("");

  const { email, password } = formdata;

  const changer = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log("the entered values are ", formdata);

    const config = {
      headers: {
        "Content-type": "application/json",
        // "x-auth-token": localStorage.getItem(token),
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:7000/api/login",
        formdata,
        {
          // withCredentials: true,
          config,
        }
      );
      console.log(res);
      localStorage.setItem("token", res.data.token);
      setAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login Failed ", err.message);
      setLoginMessage("Login failed");
    }
  };

  // const handleSubmit = () => {
  //   router.push("/dashboard");
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) router.push("/dashboard");
  }, []);
  return (
    <div>
      <div className={styles.left}>
        <img
          src="/images/logo.jpg"
          height={100}
          width={100}
          className={styles.logo}
        />

        <img
          src="/images/login.png"
          className={styles.loginimage}
          height={500}
          width={500}
        />
      </div>

      <div className={styles.right}>
        <div></div>

        <div className={styles.loginright}>
          <h1>Login</h1>

          {/* <form> */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => changer(e)}
          />
          <br></br>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => changer(e)}
          />
          <br></br>

          <button type="submit" onClick={(e) => handlesubmit(e)}>
            Submit
          </button>
          <p>{loginmessage} </p>
        </div>
      </div>
    </div>
  );
}
