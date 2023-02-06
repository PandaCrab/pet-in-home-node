const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const { main } = require('./services/db');

const authRegRouter = require('./routes/authRegRouter');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use('/', authRegRouter);

app.get('/', (req, res) => {
    res.send('Hello, you look on server');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
});

const start = async () => {
    try {
        await main();

        app.listen(PORT, () => {
            console.log(`Server listening on ${PORT}`);
        });
    } catch (err) {
        console.log(err);

        process.exit(1);
    }
};

start();