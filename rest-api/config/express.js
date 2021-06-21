const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';

module.exports = (app) => {
    app.use(cors({
        exposedHeaders: 'Authorization'
    }));

    app.use(bodyParser.json());

    app.use(cookieParser(secret));
};