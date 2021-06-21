import React from 'react';
import styles from './index.module.css';
import Header from '../components/header';
import Aside from '../components/aside';
import Footer from '../components/footer';

const PageWrapper = (props) => {
  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <Aside/>
        <div className={styles.main}>
            {props.children}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default PageWrapper;