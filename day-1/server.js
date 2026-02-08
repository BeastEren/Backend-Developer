// server will be started and database will be connected in this file

const app = require('./src/app');

app.listen(3000, () => {
    console.log('server is running on port 3000');
});