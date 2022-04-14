import "bootstrap/dist/css/bootstrap.css"; // Add this line
import "../styles/globals.css";
import Layout from "../components/Layout";
import authContext from "../Context/AuthUserContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const [authenticated, setAuthenticated] = useState(false);
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </authContext.Provider>
  );
}

export default MyApp;
