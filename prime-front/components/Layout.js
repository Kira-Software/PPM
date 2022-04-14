import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../styles/layout.module.css";
import {authContext} from "../Context/AuthUserContext"
function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      {/* <authContext. */}

      <div className={styles.layout}>
        <div>{children}</div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Layout;
