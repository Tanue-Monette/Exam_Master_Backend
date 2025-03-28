const mongoose = require("mongoose");
const Answer = require("../models/Answer.model");
const { faker } = require("@faker-js/faker");
const connectDB = require("../db");

connectDB();

const seedAnswers = async () => {
  try {
    await Answer.deleteMany();


    const questionId = "67e185d92c07d57d19a13a48";
    const userId = "67d2ebf42e0f62f5b4f2ae4f";

    const answers = Array.from({ length: 10 }).map(() => ({
      title: faker.lorem.sentence(),
      detail: faker.lorem.paragraphs(2),
      answeredBy: userId,
      question: questionId
    }));

    await Answer.insertMany(answers);
    console.log(`${answers.length} answers seeded!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding answers:", error);
    process.exit(1);
  }
};

seedAnswers();