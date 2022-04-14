import Head from "next/head";
import React, { Component, useEffect } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import styles from "../../../styles/eachPost.module.css";
// import axios from "axios"
const each = ({ post }) => {
  return (
    <div>
      <Head>
        <title>Post</title>
        <meta
          name="description"
          content="prime properties marketing post page "
        />
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      <Navbar />

      <div className={styles.body}>
        <img
          src={`http://localhost:7000/${post.data.image1}`}
          className={styles.mainImage}
        />
        <div className={styles.description}>
          <h5 style={{ marginBottom: "30px", marginTop: "50px" }}>
            Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "Brown" }}>{post.data.location}</span>
          </h5>
          <h5 style={{ marginBottom: "30px" }}>
            Available Units &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "Brown" }}>
              {post.data.availableUnits}
            </span>{" "}
          </h5>

          <h5 style={{ marginBottom: "30px" }}>
            Progress &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "Brown" }}>{post.data.progress}</span>{" "}
          </h5>
          <h5 style={{ marginBottom: "30px" }}>
            Delivery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "Brown" }}>{post.data.delivery}</span>{" "}
          </h5>
          <h5 style={{ marginBottom: "30px" }}>
            Payment Plan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ color: "Brown" }}>{post.data.paymentPlan}</span>{" "}
          </h5>
        </div>
      </div>

      <div className={styles.otherDiv}>
        {post.data.image2 && (
          <>
            <img
              src={`http://localhost:7000/${post.data.image2}`}
              className={styles.otherImage}
            />
          </>
        )}

        {post.data.image3 && (
          <img
            src={`http://localhost:7000/${post.data.image3}`}
            className={styles.otherImage}
          />
        )}

        {post.data.image4 && (
          <img
            src={`http://localhost:7000/${post.data.image4}`}
            className={styles.otherImage}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  // Fetch data from external API
  const res = await fetch(
    `http://localhost:7000/api/post/${context.params.id}`
  );
  const post = await res.json();
  console.log("the fetched post is ", post);

  // Pass post to the page via props
  return { props: { post } };
};

export default each;
