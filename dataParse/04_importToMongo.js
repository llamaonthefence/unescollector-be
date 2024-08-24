const fetchXML = require('./01_fetchXML')
const parseXML = require('./02_parseXML')
const transformData = require('./03_transformData')
const Sites = require('../daos/sites')

const updateMongoSites = async() => {
    try {
        const xmlData = await fetchXML();
        const jsonData = await parseXML(xmlData); 
        const transformedData = transformData(jsonData);

        //add code to upsert data to retain data model's user input
        for (const siteData of transformedData) {
            await Sites.findOneAndUpdate(
                {id_number: siteData.id_number},  //identify site by id_number
                siteData, //update with new data
                {upsert: true, new: true} //create new entry if doesn't exist
            )
        }

        //above code doesn't account for delisted sites.

        //saving transformed data into MongoDB
        for(const siteData of transformedData) {
            const site = new Sites(siteData);
            await site.save(); 
        }

        console.log('Data saved to MongoDB successfully.')
    } catch (error) {
        console.error('Error updating data to MongoDB', error)
    }
}

updateMongoSites();