import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import store from "./app/store";
import{Provider} from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';

window.store = store;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
    <Provider store={store}>
    <App />
    </Provider>
    </Router>
);

