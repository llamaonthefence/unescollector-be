require('dotenv').config();
const mongoose = require('mongoose');
const Site = require('./daos/sites');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });

    console.log('Connected to MongoDB for test');
    
    const testSite = new Site({
      category: 'Test',
      criteria_txt: 'Test criteria',
      danger: 'None',
      date_inscribed: '2024',
      extension: 0,
      http_url: 'http://example.com',
      id_number: 12345,
      image_url: 'http://example.com/image.png',
      iso_code: ['US'],
      justification: 'Test justification',
      latitude: 40.7128,
      longitude: -74.0060,
      location: 'Test Location',
      region: 'Test Region',
      revision: 0,
      secondary_dates: [],
      short_description: 'Test description',
      site: 'Test Site',
      states: ['US'],
      transboundary: false,
      unique_number: 12345,
    });

    await testSite.save();
    console.log('Test document saved successfully');

  } catch (error) {
    console.error('Error in test connection:', error);
  } finally {
    mongoose.connection.close();
  }
};

testConnection();
