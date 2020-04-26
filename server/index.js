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
  { question_text: "When was the battle of Waterloo?", answer_text: "1815" },
  { question_text: "When was Bob Dylans birthday?", answer_text: "Last week" },
];

let count = 0;
let lobby = [];
let gameStarted = false;
let phase = 0;
let calcScores = () => {
  lobby = lobby.map((person) => ({
    ...person,
    score: person.responses.reduce((acc, cur) => {
      if (cur.correct) {
        acc += 100;
      }
      return acc;
    }, 0),
  }));
};
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
        question: questions[count].question_text,
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
        data: {
          question: questions[count].question_text,
          questionNumber: count + 1,
          answer: questions[count].answer_text,
        },
      });
    }
    if (action.type === "server/increment") {
      console.log(`${socket.id} sent new question!`);
      count++;
      io.emit("action", {
        type: "question",
        data: {
          question: questions[count].question_text,
          questionNumber: count + 1,
          answer: questions[count].answer_text,
        },
      });
      phase = 0;
      io.emit("action", {
        type: "phase",
        data: phase,
      });
    }
    if (action.type === "server/submit") {
      const personIndex = lobby.findIndex(
        (item) => item.socket_id === socket.id
      );
      lobby[personIndex].responses.push({
        questionNumber: action.data.questionNumber - 1,
        response: action.data.response,
      });
      socket.emit("action", {
        type: "submitted",
        data: "submitted",
      });
      io.emit("action", {
        type: "lobby",
        data: lobby,
      });
      const allSubmitted = lobby.every(
        (person) => person.responses[count] && person.responses[count].response
      );
      if (allSubmitted) {
        phase = 1;
        io.emit("action", {
          type: "phase",
          data: phase,
        });
      }
    }

    if (action.type === "server/timeup") {
      phase = 1;
      lobby.forEach((person) => {
        if (!person.responses[count]) {
          person.responses[count] = false;
        }
      });
      io.emit("action", {
        type: "phase",
        data: phase,
      });
      io.emit("action", {
        type: "lobby",
        data: lobby,
      });
    }
    if (action.type === "server/submitMarks") {
      lobby = action.data;
      calcScores();
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
        lobby.push({
          socket_id: socket.id,
          name: action.data,
          responses: [],
          score: 0,
        });
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
