import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
    users.push(req.body);
    res.send("OK");
});

server.post("/tweets", (req, res) => {
    let tweetAuthor = users.find(user => user.username === req.body.username);
    const tweet = {...req.body, avatar: tweetAuthor.avatar};
    tweets.push(tweet);
    res.send("OK");
});

server.get("/tweets", (req, res) => {
    res.send(tweets.slice(-10).reverse());
});

server.listen(5000, () => {
    console.log("Server running at port 5000");
});

