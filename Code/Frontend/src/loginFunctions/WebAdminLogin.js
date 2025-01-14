// Web Admin Login Logic
// This function handles the authentication logic for web admin users.

export const WebAdminLogin = async (setStatus, navigate, response, webAdminToken, username) => {
    // Backend section
    try {
        // Check if the authentication token was sent back in the response header
        try {
            const contentType = response.headers.get("content-type");

            // If the response is a JSON object (with an access token)
            if (contentType && contentType.indexOf("application/json") !== -1) {
                // Set the status to success
                setStatus({ type: 'success' });

                // Data has an access token and is authenticated
                // Navigate the web admin to the web admin dashboard with the extracted username and token
                navigate('/webadmindashboard', { state: { user: username, token: webAdminToken } });
            } else {
                // If the response doesn't contain a JSON object, return an error
                return 'error';
            }
        } catch (e) {
            // Handle errors related to getting the response header
            return 'error';
        }
    } catch (error) {
        // Handle other errors during the authentication process
        return 'error';
    }
};