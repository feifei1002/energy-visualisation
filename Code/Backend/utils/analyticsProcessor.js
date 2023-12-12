const axios = require('axios');

const convertLatLongToCountry = async (latitude, longitude) => {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.results && data.results.length > 0) {
            //accessing the ISO_3166-1_alpha-3 country code because this is type country code used in the geojson
            return data.results[0].components['ISO_3166-1_alpha-3'];
        }

        return null;
    } catch (error) {
        console.error('Error converting lat-long to country code:', error);
        return null;
    }
};

module.exports = { convertLatLongToCountry };
