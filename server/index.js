const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const useRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", useRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Successfully');
}).catch((err) => {
    console.log('Error connecting to MongoDB');
    console.log(err);
});

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on port: ${process.env.PORT}`);
})