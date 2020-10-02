import React, { Fragment } from 'react';

import Header from './components/Header';
import Cotas from './components/Cotas';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Fragment>
      <Header />
      <Cotas />
    </Fragment>
  );
}



export default App;