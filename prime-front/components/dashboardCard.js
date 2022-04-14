import React from "react";
import styles from "../styles/dashboardCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

function DashboardCard({ post }) {
  //const router = useRouter();

  const handleDelete = async (id) => {
    let answer = window.confirm("are you sure you want to delete this post?");
    console.log("the answer value is ", answer)
    if (answer){
      try{
       const response =  await axios.delete(`http://localhost:7000/api/post/${id}`)
       console.log("the deleted response is ",response)
       window.location.reload()
      } catch(err){
        console.error("error occured", err)
      }
    //  window.location.reload()
    }
    
  };

  return (
    <div className={styles.card}>

    <Link href="/post/[id]" as={`/post/${post._id}`}>
        <img
          src={`http://localhost:7000/${post.image1}`}
          className={styles.cardImage}
        />
    </Link>
     <p>{post.location}</p>
        <p>{post.availableUnits}</p>
        <button className={styles.delete} onClick={() => handleDelete(post._id)}>Delete</button>
    </div>

  );
}

export default DashboardCard;
