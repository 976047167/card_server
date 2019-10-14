import GameController from "./gameController";

const readline = require("readline");
const g = GameController.getInstance();
const gid = g.createBattle(111);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input ID, command & arg (eg: 1 -set 1).  ",
});

rl.prompt();

rl.on("line", (answer) => {
    answer.trim();
    answer = answer.split(" ");
    const id = answer[0];
    const command = answer[1];
    const args = answer[2];
    deal(id, command, args);
    rl.prompt();
}).on("close", () => {
    console.log("Have a nice day!");
    process.exit(0);
});

function deal(id, cmd, args) {
    switch (cmd) {
        case "-c":
    }
}
