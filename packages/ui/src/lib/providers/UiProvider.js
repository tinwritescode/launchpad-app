import "../styles/css/swiper-bundle.min.css";
import "../styles/sass/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import AppProvider from "../context/AppContext";
import { Layout } from "../components";
import ScrollToTop from "react-scroll-to-top";

const UiProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  //........... animation.....
  useEffect(() => {
    AOS.init();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AppProvider>
      <Layout>
        {loading && (
          <div className="preloader">
            <div className="preloader__inner">
              <div className="preloader__icon">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        {children}
      </Layout>
      <ScrollToTop
        className="scroll-to-top flex items-center justify-center"
        smooth
        viewBox="0 0 448 512"
        svgPath="M384 352v64c0 17.67-14.33 32-32 32H96c-17.67 0-32-14.33-32-32v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64c0 53.02 42.98 96 96 96h256c53.02 0 96-42.98 96-96v-64c0-17.67-14.33-32-32-32S384 334.3 384 352zM201.4 9.375l-128 128c-12.51 12.51-12.49 32.76 0 45.25c12.5 12.5 32.75 12.5 45.25 0L192 109.3V320c0 17.69 14.31 32 32 32s32-14.31 32-32V109.3l73.38 73.38c12.5 12.5 32.75 12.5 45.25 0s12.5-32.75 0-45.25l-128-128C234.1-3.125 213.9-3.125 201.4 9.375z"
      />
    </AppProvider>
  );
};

export default UiProvider;
