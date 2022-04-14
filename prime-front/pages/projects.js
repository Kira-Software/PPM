import React, { Component } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../styles/projects.module.css";
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";

const about = ({ data }) => {
  return (
    <div>
        <Head>
        <title>Projects</title>
        <meta name="description" content="prime properties marketing projects page " />
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      <Navbar />
      <div className={styles.title}>
        <h1>Projects</h1>
      </div>

      <div className={styles.body}>
        {data.data.map((post, idx) => {
          console.log(uuidv4());
          return (
            <div key={uuidv4()}>
              <Card post={post} />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:7000/api/post`);
  const data = await res.json();
  console.log("the fetched datas are", data);

  // Pass data to the page via props
  return { props: { data } };
}

export default about;
