import React from "react";
import styles from "../styles/card.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function Card({ post }) {

  return (
    <Link href="/post/[id]" as={`/post/${post._id}`}>
      <div className={styles.card}>
        <img
          src={`http://localhost:7000/${post.image1}`}
          className={styles.cardImage}
        />
        <h5>{post.location}</h5>
        <p>{post.availableUnits}</p>
      </div>
    </Link>
  );
}

export default Card;
