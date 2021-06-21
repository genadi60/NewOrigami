import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.module.css'
import App from './App';
import Navigation from './navigation'
import PageWrapper from './page-wrapper'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <PageWrapper>
          <Navigation />
        </PageWrapper>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);