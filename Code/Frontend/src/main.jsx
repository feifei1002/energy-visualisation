import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Auth0Provider
          domain="dev-osrswyxpukb5rlqq.us.auth0.com"
          clientId="u3BzR6uc5HGjp7P7fJiiUswVX5bjVyhK"
          redirectUri={window.location.origin}
      >
    <App />
      </Auth0Provider>
  </React.StrictMode>,
    document.getElementById('root')
);

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
// )
