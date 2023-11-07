import React, { useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import RegistrationComponent from './RegistrationPage';


function App() {
    return (
        <Auth0Provider
            domain="yourDomain"
            clientId="yourClientId"
            redirectUri={window.location.origin}
        >
            <RegistrationPage />
        </Auth0Provider>
    );
}

module.exports = {

};
export default App;