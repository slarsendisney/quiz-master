import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
let socket = io("http://localhost:3000");

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(
  state = {
    gameStarted: false,
    lobby: [],
    submitted: false,
    phase: 0,
  },
  action
) {
  switch (action.type) {
    case "gameState":
      return Object.assign({}, { ...state, ...action.data });
    case "startGame":
      return Object.assign(
        {},
        { ...state, gameStarted: true, currentQuestion: action.data }
      );
    case "question":
      return Object.assign(
        {},
        { ...state, submitted: false, currentQuestion: action.data }
      );
    case "phase":
      return Object.assign({}, { ...state, phase: action.data });
    case "submitted":
      return Object.assign({}, { ...state, submitted: true });
    case "setName":
      return Object.assign({}, { ...state, name: action.data });
    case "lobby":
      return Object.assign({}, { ...state, lobby: action.data });
    case "join":
      return Object.assign({}, { ...state, name: action.data });
    default:
      return state;
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(() => {
  console.log("new client state", store.getState());
});

export default store;
