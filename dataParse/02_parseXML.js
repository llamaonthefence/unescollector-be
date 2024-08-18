const { parseStringPromise } = require('xml2js');

const parseXML = async (xmlData) => {
  try {
    // Convert XML to JSON using xml2js
    const result = await parseStringPromise(xmlData);
    return result;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw error;
  }
};

module.exports = parseXML;
