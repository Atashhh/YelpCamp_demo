const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp =  new Campground({
          // YOUR USER ID
            author: '63906dc532200d55019cf5d0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            // image: 'https://source.unsplash.com/collection/483251', 
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloribus quaerat eaque commodi consequatur, eligendi, reprehenderit totam voluptates pariatur sint recusandae atque ipsum corrupti. Inventore voluptatibus facere voluptatum debitis quibusdam?',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dilmzqkbh/image/upload/v1671017865/YelpCamp/sample_ix7z38.jpg', 
                  filename: 'YelpCamp/sample_ix7z38'
                },
                {
                  url: 'https://res.cloudinary.com/dilmzqkbh/image/upload/v1671017907/YelpCamp/cld-sample-3_dsp5ca.jpg',
                  filename: 'YelpCamp/cld-sample-3_dsp5ca'
                },
                {
                  url: 'https://res.cloudinary.com/dilmzqkbh/image/upload/v1671017902/YelpCamp/cld-sample_e3bgtu.jpg',
                  filename: 'YelpCamp/cld-sample_e3bgtu'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close();
});