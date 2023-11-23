//Web Admin Login Logic
export const WebAdminLogin = async (setStatus, navigate, response) => {
        console.log("in web admin function");
        // backend section
        try {
            // if auth token was sent back
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // The response was a JSON object (with an access token)
                    setStatus({ type: 'success'});

                    // data has access token and is authenticated
                    // navigate the web admin to the profile dashboard for now
                    navigate('/profiledashboard');

                } else {
                    return 'error';
                }
            } catch (e) {
                // when error with getting header
                return 'error';
            }
        } catch (error) {
            return 'error';
        }
};