const axios = require('axios');

const convertLatLongToCountry = async (latitude, longitude) => {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.results && data.results.length > 0) {
            // Typically, the country information is in the 'components' object
            return data.results[0].components.country;
        }

        return null;
    } catch (error) {
        console.error('Error converting lat-long to country:', error);
        return null;
    }
};
