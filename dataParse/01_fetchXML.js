const axios = require('axios');

const fetchXML = async () => {
  const url = 'https://whc.unesco.org/en/list/xml';
  
  try {
    // Send GET request to UNESCO XML feed
    const response = await axios.get(url);

    // Return XML data from response
    return response.data;
  } catch (error) {
    console.error('Error fetching XML:', error.message);
    throw error;
  }
};

module.exports = fetchXML;
