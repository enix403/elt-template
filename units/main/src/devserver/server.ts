import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.DEV_MOCK_SERVER_PORT || 7050;

app.set('etag', false);

app.use(express.json({
    limit: '50mb',
    type: ["application/json"],
    strict: true
}));

app.use(cors({
    origin: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    maxAge: 1000,
    preflightContinue: false
}));

app.all('/', (req, res) => {
    res.status(200);

    res.header('Surrogate-Control', 'no-store');
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');

    res.json({
        title: 'Hello World, not from edawdaxpress',
        YourStuff: req.body
    });
});


app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))


