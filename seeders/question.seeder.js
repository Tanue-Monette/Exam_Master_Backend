const mongoose = require("mongoose");
const Question = require("../models/question.model");
const User require("../models/user.model");
const { faker } = require("@faker-js/faker");
const connectDB = require("../db");

const seedQuestions = async () => {
    try {

        await connectDB();


        await Question.deleteMany();

        console.log("Existing questions deleted");


        const questions = [];
        for (let i = 0; i < 10; i++) {
            const question = new Question({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                year: faker.number.int({ min: 2010, max: 2023 }).toString(),
                exam_type: faker.helpers.arrayElement(["First semester", "Second semester", "CA", "Resit"]),
                examiner: faker.person.fullName(),
                study_field: faker.helpers.arrayElement(["Mathematics", "Physics", "Chemistry", "Biology"]),
                image: faker.image.url(),
                askedBy: {
                  _id: new mongoose.Types.ObjectId(),
                  name: faker.person.fullName(),
                }
            });
            questions.push(question);
        }


        await Question.insertMany(questions);
        console.log(`${questions.length} questions seeded successfully`);


        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding questions:", error);
        process.exit(1);
    }
};

seedQuestions();