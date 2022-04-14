import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// import { Carousel } from "react-responsive-carousel";
import { Carousel } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css"
import Head from "next/head";

const projects = () => {
  return (
    <div>
        <Head>
        <title>Home</title>
        <meta name="description" content="prime properties marketing home page " />
        <link rel="icon" href="/images/logo.jpg" />
      </Head>
      <Navbar />

      <div className={styles.space} ></div>

      <Carousel className={styles.carousel}>
        <Carousel.Item>
          <img
            src="/images/new1.jpg"
            alt="First slide"
          />
          <Carousel.Caption className={styles.caption}>
            <h3 >Prime Properties Marketing</h3>
            <p>
              Securing Your Tomorrow!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/new2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption className={styles.caption}>
            <h3 >Sunrise Apartments</h3>
            {/* <p >
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/new3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption className={styles.caption}>
            <h3 >Victory Apartments</h3>
            {/* <p >
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className={styles.discoverDiv}>
        <h1 className={styles.discover}>
          Discover Your Perfect Home
        </h1>
        <img src="/images/search.png" width={100} height={100} />
      </div>
     
      <Footer />
    </div>
  );
};

export default projects;
