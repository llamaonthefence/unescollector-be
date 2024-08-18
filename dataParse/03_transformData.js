const mongoose = require('mongoose')
const Site = require('../daos/sites')

const transformData = (jsonData) => {
    try {
      //jsonData.query.row is the structure holding the site data
      const transformedData = jsonData.query.row.map(item => ({
        category: item.category[0],                 // Mapping "category" to "category"
        criteria_txt: item.criteria_txt[0],         // Mapping "criteria_txt" to "criteria_txt"
        danger: item.danger[0],                     // Mapping "danger" to "danger"
        date_inscribed: item.date_inscribed[0],     // Mapping "date_inscribed" to "date_inscribed"
        extension: parseInt(item.extension[0]),     // Mapping "extension" to "extension"
        http_url: item.http_url[0],                 // Mapping "http_url" to "http_url"
        id_number: parseInt(item.id_number[0]),     // Mapping "id_number" to "id_number"
        image_url: item.image_url[0],               // Mapping "image_url" to "image_url"
        iso_code: item.iso_code[0].split(','),      // Mapping "iso_code" to "iso_code" and splitting into an array
        justification: item.justification[0],       // Mapping "justification" to "justification"
        latitude: parseFloat(item.latitude[0]),     // Mapping "latitude" to "latitude"
        longitude: parseFloat(item.longitude[0]),   // Mapping "longitude" to "longitude"
        location: item.location[0],                 // Mapping "location" to "location"
        region: item.region[0],                     // Mapping "region" to "region"
        revision: parseInt(item.revision[0]),       // Mapping "revision" to "revision"
        secondary_dates: item.secondary_dates[0].split(','), // Mapping "secondary_dates" to "secondary_dates"
        short_description: item.short_description[0], // Mapping "short_description" to "short_description"
        site: item.site[0],                         // Mapping "site" to "site"
        states: item.states[0].split(','),          // Mapping "states" to "states" and splitting into an array
        transboundary: item.transboundary[0] === "1", // Mapping "transboundary" to boolean
        unique_number: parseInt(item.unique_number[0]) // Mapping "unique_number" to "unique_number"
      }));
  
      return transformedData;
  
    } catch (error) {
      console.error('Error transforming data:', error);
      throw error;
    }
  };
  
  module.exports = transformData;
  