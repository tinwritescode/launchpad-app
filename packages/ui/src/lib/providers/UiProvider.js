import '../styles/css/swiper-bundle.min.css';
import '../styles/sass/style.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import AppProvider from '../context/AppContext';
import { Layout } from '../components';

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
    </AppProvider>
  );
};

export default UiProvider;
