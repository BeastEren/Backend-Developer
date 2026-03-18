require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./config/database');

connectToDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})
