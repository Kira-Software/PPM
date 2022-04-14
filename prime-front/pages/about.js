import Head from "next/head";
import React, { Component } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/about.module.css";

const about = () => {
  return (
    <div>
        <Head>
        <title>About Us</title>
        <meta name="description" content="prime properties marketing about page " />
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      <Navbar />

      <div className={styles.title}>
       <h1>About Us</h1> 
      </div>

      <div className={styles.about}>
        <div className={styles.top}>
          <h1>What We Do</h1>
          <p>
            Prime property marketing plc is established for the purpose of
            filling the gap between the real estate owner and the customer. We
            choose to focus on dynamic and innovative style of marketing taking
            into consideration the current demand in which the customer will be
            easily convinced in purchasing the properties we promote.{" "}
          </p>
        </div>

        <div>
          <img src="/images/real-r.png" className={styles.topimage} />
        </div>
      </div>

      <div>
        <div className={styles.bottom}>
          <h1>Why Us?</h1>
          <p>
            We are well staffed, eager and passionate company ready to market
            our clients’ products and service. Our great performance has always
            been accredited to our culture, with a deep understanding that in
            order to improve the lives of our clients we must reflect our
            internal working culture and promise for a wonderful world. Prime
            property marketing is responsible for the research, analysis,
            strategy, branding, advertising and promotion on the behalf of the
            real estate company.{" "}
          </p>
        </div>
        <div className={styles.bottom}>
          <h1>Our Achievements</h1>
          <p>
            The founding members have more than 6 to 10-year experience
            specifically in the real estate sector. During this period, we
            consult more than 5,700 clients and we have sold more than 900
            houses. We have worked on active real estate companies starting from
            being new to the market, until they become the leading brand in the
            sector. During the time we have worked in the position of sales
            consultant to marketing manager.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
