const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    
    await User.deleteMany({});
    await User.collection.insertMany(userData);

    await Thought.deleteMany({});
    await Thought.collection.insertMany(thoughtData);
    
    console.table(userData, thoughtData);
    console.info('Seeding complete 🌱');
})