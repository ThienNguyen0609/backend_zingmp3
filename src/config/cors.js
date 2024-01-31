import cors from 'cors'

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}

const configCORS = (app) => {
    app.use(allowCrossDomain);
    app.use(
        cors({
          credentials: true,
          origin: "http://localhost:3000"
        }),
    );
}

export default configCORS