const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { handleDeletePerson } = require("./manager/person");

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get("", (req, res) => {
    res.json({message: "Welcome to the application"});
});

app.delete("/person/:personId", async (req, res) => {
    const { personId } = req.params;
    const person = await handleDeletePerson(personId);
    res.json(person);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
