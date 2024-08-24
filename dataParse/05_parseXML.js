const fs = require('fs')
const xml2js = require('xml2js');
const transformData = require('./03_transformData');

const xmlFilePath = './dataParse/whc-en.xml'

const parseXML = async (filePath) => {
    const parser = new xml2js.Parser(); 
    const xmlData = fs.readFileSync(filePath, 'utf8'); 

    try {
        const result = await parser.parseStringPromise(xmlData);
        return result; 
    } catch (error) {
        console.error('Error parsing XML', error)
        throw error; 
    }
}

const transformedData = (data) => {
    const transformedData = {...data, newField: 'example'}
    return transformedData; 
}

const storeLocalJSON = (jsonData, outputFilePath) => {
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
    console.log(`JSON data saved to ${outputFilePath}`);
}

const main = async() => {
    try {
        const jsonData = await parseXML(xmlFilePath);
        const transformedData = transformData(jsonData);

        const jsonFilePath = './dataParse/whc-en.json';
        storeLocalJSON(transformedData, jsonFilePath);
    } catch (error) {
        console.error('An error occurred.', error); 
    }
}

main(); 