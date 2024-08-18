var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Import fetchXML.js 
const fetchXML = require('../dataParse/01_fetchXML')

//Import parseXML.js
const parseXML = require('../dataParse/02_parseXML');

//test script for fetching XML data
router.get('/fetch-xml', async function(req, res, next) {
  try {
    // Call the fetchXML function
    const xmlData = await fetchXML();

    // Send the fetched XML data as the response
    res.set('Content-Type', 'application/xml'); // Set content type to XML
    res.send(xmlData);
  } catch (error) {
    // Log the full error for debugging
    console.error('Error fetching XML data:', error);

    // Respond with a 500 status and an error message
    res.status(500).send('Error fetching XML data');
  }
});

// Test script for parsing XML data to JSON
router.get('/parse-xml', async function(req, res, next) {
  try {
    // Fetch the XML data
    const xmlData = await fetchXML();

    // Parse the XML data into JSON
    const jsonData = await parseXML(xmlData);

    // Send the parsed JSON data as the response
    res.json(jsonData);
  } catch (error) {
    // Log the full error for debugging
    console.error('Error parsing XML data:', error);

    // Respond with a 500 status and an error message
    res.status(500).send('Error parsing XML data');
  }
});

module.exports = router;
