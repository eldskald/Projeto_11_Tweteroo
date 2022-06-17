import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

function validate (obj) {
    return Object.entries(obj).every(entry => entry[1] != "" && typeof(entry[1]) == "string");
}

server.post("/sign-up", (req, res) => {
    if (!validate(req.body)) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        users.push(req.body);
        res.status(201).send("OK");
    }
});

server.post("/tweets", (req, res) => {
    if (!validate(req.body)) {
        res.status(400).send("Todos os campos são obrigatórios!");
    } else {
        let tweetAuthor = users.find(user => user.username == req.headers.user);
        const tweet = {...tweetAuthor, ...req.body};
        tweets.push(tweet);
        res.status(201).send("OK");
    }
});

server.get("/tweets", (req, res) => {
    const page = Number(req.query.page);
    if (page == 1) {
        res.send(tweets.slice(-10).reverse());
    } else {
        const sliceStart = -10 * page;
        const sliceEnd = page > 0 ? -10 * (page - 1) : 0;
        res.send(tweets.slice(sliceStart, sliceEnd).reverse());
    }
});

server.get("/tweets/:username", (req, res) => {
    res.send(tweets.filter(tweet => tweet.username == req.params.username).reverse());
});

server.listen(5000, () => {
    console.log("Server running at port 5000");
});

