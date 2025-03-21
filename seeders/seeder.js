const mongoose = require('mongoose');
const faker = require('@faker-js/faker');
const Examiner = require('../models/Examiner.model');

// Define the seeder function
 const seedExaminer = async () => {
//    console.log("faker value: ", faker)
  try {
    const examinerCollection = await Examiner.find();
    if(examinerCollection.length > 1){
        return
    }
    // Clear existing data
    await Examiner.deleteMany();

    // Generate and insert new users
    const examiners = [];
    for (let i = 0; i < 10; i++) {
      const examiner = new Examiner({
        name: faker.person.fullName(),
      });
      examiners.push(examiner);
    }
    await Examiner.insertMany(examiners);

    console.log('Examiner seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding Examiner:', error);
    process.exit(1);
  }
};

module.exports = seedExaminer;
