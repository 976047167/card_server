import GameController from "./gameController";

const readline = require("readline");
const g = GameController.getInstance();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input line, column & verion (eg: 1:1399 v-0.0.0).  ",
});

rl.prompt();

rl.on("line", (answer) => {
    answer.trim();
    answer = answer.split(" ");
    const ver = answer[1];

    rl.prompt();
}).on("close", () => {
    console.log("Have a nice day!");
    process.exit(0);
});
