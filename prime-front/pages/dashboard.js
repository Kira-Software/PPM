import React, { Component, useContext, useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import Addpost from "../components/addpost";
import addpost from "../components/addpost";
import styles from "../styles/dashboard.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Card from "../components/Card";
import DashboardCard from "../components/dashboardCard";
import authContext from "../Context/AuthUserContext";

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const { authenticated, setAuthenticated } = useContext(authContext);
  const [formdata, setformdata] = useState({
    location: "",
    availableUnits: "",
    progress: "",
    delivery: "",
    paymentPlan: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [imgPreview1, setImgPreview1] = useState(null);
  const [imgPreview2, setImgPreview2] = useState(null);
  const [imgPreview3, setImgPreview3] = useState(null);
  const [imgPreview4, setImgPreview4] = useState(null);

  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [error4, setError4] = useState(null);

  const {
    location,
    availableUnits,
    progress,
    delivery,
    paymentPlan,
    description,
    image1,
    image2,
    image3,
    image4,
  } = formdata;

  const changer = (e) => {
    if (e.target.type !== "file") {
      setformdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.type === "file") {
      const selected = e.target.files[0];
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];
      if (selected && ALLOWED_TYPES.includes(selected.type)) {
        let reader = new FileReader();
        reader.onloadend = () => {
          if (e.target.name === "image1") {
            setImgPreview1(reader.result);
          }
          if (e.target.name === "image2") {
            setImgPreview2(reader.result);
          }
          if (e.target.name === "image3") {
            setImgPreview3(reader.result);
          }
          if (e.target.name === "image4") {
            setImgPreview4(reader.result);
          }
        };
        reader.readAsDataURL(selected);

        setformdata({
          ...formdata,
          [e.target.name]: e.target.files[0],
        });
      } else {
        if (e.target.name === "image1") {
          setError1(true);
        }
        if (e.target.name === "image2") {
          setError2(true);
        }
        if (e.target.name === "image3") {
          setError3(true);
        }
        if (e.target.name === "image4") {
          setError4(true);
        }
      }
    }
  };

  const removeImage = (e) => {
    if (e.target.name === "image1") {
      setImgPreview1(null);
      setformdata({
        ...formdata,
        [e.target.name]: null,
      });
    } else if (e.target.name === "image2") {
      setImgPreview2(null);
      setformdata({
        ...formdata,
        [e.target.name]: null,
      });
    }
    if (e.target.name === "image3") {
      setImgPreview3(null);
      setformdata({
        ...formdata,
        [e.target.name]: null,
      });
    }
    if (e.target.name === "image4") {
      setImgPreview4(null);
      setformdata({
        ...formdata,
        [e.target.name]: null,
      });
    }
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log("the entered values are ", formdata);

    const fd = new FormData();
    if (image1) {
      fd.append("itemImage", image1, image1.name);
    }
    if (image2) {
      fd.append("itemImage", image2, image2.name);
    }
    if (image3) {
      fd.append("itemImage", image3, image3.name);
    }
    if (image4) {
      fd.append("itemImage", image4, image4.name);
    }

    fd.set("location", location);
    fd.set("availableUnits", availableUnits);
    fd.set("progress", progress);
    fd.set("delivery", delivery);
    fd.set("paymentPlan", paymentPlan);
    fd.set("description", description);

    console.log("the final form data value is ", fd);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        // "x-auth-token": localStorage.getItem("token"),
      },
    };
    axios.defaults.headers.common["x-auth-token"] =
      localStorage.getItem("token");
    try {
      const res = await axios.post("http://localhost:7000/api/post", fd, {
        withCredentials: true,
        config,
      });
      console.log(res);
    } catch (err) {
      console.error("the error is ", err.message);
    }
  };

  const mystyle = { height: 50, width: 50 };
  const removestyle = {
    marginLeft: "50px",
    color: "white",
    backgroundColor: "red",
    borderRadius: "10px",
  };

  useEffect(() => {
    if (!authenticated && !localStorage.getItem("token"))
      router.push('/login')
  }, [])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalbody}>
        <table>
          <tr>
            <td>
              <label className={styles.modallabel}>Location </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="location"
                value={location}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Available Units </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="availableUnits"
                value={availableUnits}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Progress </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="progress"
                value={progress}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <label className={styles.modallabel}>Delivery </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="delivery"
                value={delivery}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>{" "}
          <tr>
            <td>
              <label className={styles.modallabel}>Payment Plan </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="paymentPlan"
                value={paymentPlan}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Description </label>
            </td>
            <td>
              <input
                type="text"
                className={styles.modalinput}
                name="description"
                value={description}
                onChange={(e) => changer(e)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Image1 </label>
            </td>
            <td>
              <input
                type="File"
                name="image1"
                onChange={(e) => changer(e)}
                accept="image/*"
              />
            </td>
            <td>
              <div style={{ display: imgPreview1 ? "block" : "none" }}>
                <img src={imgPreview1} height={50} width={50} style={mystyle} />
                <button
                  // className="text-white  bg-red-900 font-semibold w-1/2 text-center mt-3 ml-8 rounded-md px-2 py-2"
                  //name="image1"
                  style={removestyle}
                  onClick={removeImage}
                  name="image1"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Image2 </label>
            </td>
            <td>
              <input
                type="File"
                //  className=" px-2 py-1 rounded-md border shadow-sm w-full mt-2"
                name="image2"
                onChange={(e) => changer(e)}
                accept="image/*"
              />
            </td>

            <td>
              <div style={{ display: imgPreview2 ? "block" : "none" }}>
                <img src={imgPreview2} height={50} width={50} style={mystyle} />
                <button
                  // className="text-white  bg-red-900 font-semibold w-1/2 text-center mt-3 ml-8 rounded-md px-2 py-2"
                  //name="image1"
                  style={removestyle}
                  onClick={removeImage}
                  name="image2"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Image3 </label>
            </td>
            <td>
              <input
                type="File"
                //  className=" px-2 py-1 rounded-md border shadow-sm w-full mt-2"
                name="image3"
                onChange={(e) => changer(e)}
                accept="image/*"
              />
            </td>

            <td>
              <div style={{ display: imgPreview3 ? "block" : "none" }}>
                <img src={imgPreview3} height={50} width={50} style={mystyle} />
                <button
                  // className="text-white  bg-red-900 font-semibold w-1/2 text-center mt-3 ml-8 rounded-md px-2 py-2"
                  //name="image1"
                  style={removestyle}
                  onClick={removeImage}
                  name="image3"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label className={styles.modallabel}>Image4 </label>
            </td>
            <td>
              <input
                type="File"
                //  className=" px-2 py-1 rounded-md border shadow-sm w-full mt-2"
                name="image4"
                onChange={(e) => changer(e)}
                accept="image/*"
              />
            </td>

            <td>
              <div style={{ display: imgPreview4 ? "block" : "none" }}>
                <img src={imgPreview4} height={50} width={50} style={mystyle} />
                <button
                  // className="text-white  bg-red-900 font-semibold w-1/2 text-center mt-3 ml-8 rounded-md px-2 py-2"
                  //name="image1"
                  style={removestyle}
                  onClick={removeImage}
                  name="image4"
                >
                  Remove
                </button>
              </div>
            </td>
          </tr>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={(e) => handlesubmit(e)}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

const dashboard = ({data}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div>
      <div className={styles.sidebar}>
        <img src="/images/logo.jpg" height={100} width={100} />

        <div className={styles.menu}>
          <Button variant="light" className={styles.dashboardbut}>
            Dashboard
          </Button>
          <Accordion defaultActiveKey="0" className={styles.accordion}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Manage Posts</Accordion.Header>
              <Accordion.Body
                onClick={() => setModalShow(true)}
                className={styles.accbutton}
              >
                Add Post
              </Accordion.Body>
              <hr></hr>
              {/* <Accordion.Body>Show Post</Accordion.Body> */}
            </Accordion.Item>
            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>Lorem ipsum</Accordion.Body>
            </Accordion.Item> */}
          </Accordion>
        </div>
      </div>
      <div className={styles.top}>
        <h1>Prime Properties</h1>{" "}
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div
      className={styles.projects}
      >

        {data.data.map((post, idx) => {
          return (
            <div >
              <DashboardCard post={post} />
            </div>
          );
        })}

      </div>

      {/* <Addpost open={open} /> */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:7000/api/post`);
  const data = await res.json();
  console.log("the fetched datas are", data);

  // Pass data to the page via props
  return { props: { data } };
}

export default dashboard;
