import React from 'react';
import Router from '../router/router.component';
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import './app.styles.scss';

const App = () => {
  return (
    <>
      <div className='app'>
        <Header />
        <Router />
        <Footer />
      </div>
    </>
  );
};

export default App;
