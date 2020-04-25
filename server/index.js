const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");

const dev = !(process.env.NODE_ENV === "production");

app.use(compression());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

if (dev) {
  require("dotenv").config();
  const proxy = require("http-proxy-middleware");
  app.use(
    proxy({
      target: "http://localhost:5051",
      changeOrigin: true,
      ws: true,
    })
  );
}

const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, () =>
  console.log(`🍉 Up and running on http://localhost:${port}`)
);

let questions = [
  "When was the battle of Waterloo?",
  "When was Bob Dylans birthday?",
];
let count = 0;
let lobby = [];
let gameStarted = false;
const io = !dev
  ? require("socket.io")(server, {
      transports: ["xhr-polling"],
    })
  : require("socket.io")(server);

io.on("connection", function (socket) {
  console.log("socket connected: " + socket.id);
  socket.emit("action", {
    type: "gameState",
    data: {
      gameStarted,
      currentQuestion: {
        question: questions[count],
        questionNumber: count + 1,
      },
      lobby,
    },
  });
  socket.on("action", (action) => {
    if (action.type === "server/hello") {
      console.log("got hello data!", action.data);
      socket.emit("action", { type: "message", data: "🍉 says hey!" });
    }
    if (action.type === "server/start") {
      console.log(`${socket.id} started the game!`);
      gameStarted = true;
      io.emit("action", {
        type: "startGame",
        data: { question: questions[count], questionNumber: count + 1 },
      });
    }
    if (action.type === "server/increment") {
      console.log(`${socket.id} sent new question!`);
      count++;
      io.emit("action", {
        type: "question",
        data: { question: questions[count], questionNumber: count + 1 },
      });
    }
    if (action.type === "server/submit") {
      const personIndex = lobby.findIndex(
        (item) => item.socket_id === socket.id
      );
      console.log(personIndex);
      lobby[personIndex].responses.push({
        questionNumber: action.data.questionNumber - 1,
        response: action.data.question,
      });
      socket.emit("action", {
        type: "submitted",
        data: "submitted",
      });
      io.emit("action", {
        type: "lobby",
        data: lobby,
      });
    }
    if (action.type === "server/join") {
      console.log(`${socket.id}`);
      const personIndex = lobby.findIndex((item) => item.name === action.data);
      if (personIndex > -1) {
        lobby[personIndex].socket_id = socket.id;
      } else {
        lobby.push({ socket_id: socket.id, name: action.data, responses: [] });
      }

      socket.emit("action", {
        type: "join",
        data: action.data,
      });
      io.emit("action", {
        type: "lobby",
        data: lobby,
      });
    }
  });
});
