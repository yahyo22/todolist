import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom"
import Context from './context/Context';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <ToastContainer/>
  <Context>
  <App/>
  </Context>
  </BrowserRouter>
);
