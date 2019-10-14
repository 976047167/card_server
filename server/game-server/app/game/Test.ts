import Battle from "./battle";
import { IPlayerInfo } from "./battlePlayer";
import GameController from "./gameController";

const readline = require("readline");
const gid = createBattle();
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
    const g = GameController.getInstance();
    console.log(cmd);
    switch (cmd) {
        case "-a":
            setPlayer();
            g.startBattle(gid);
        case "-b":
            break;
    }
}
function setPlayer() {
    const g = GameController.getInstance();
    const player1: IPlayerInfo = {
        uid: "1",
        attribute: {
            spirit: 1,
            agile: 1,
            stamina: 1,
            strength: 1,
            perception: 1,
            intellect: 0,
        },
    };
    const player2: IPlayerInfo = {
        uid: "2",
        attribute: {
            spirit: 1,
            agile: 1,
            stamina: 1,
            strength: 1,
            perception: 1,
            intellect: 0,
        },
    };
    g.setPlayer(gid, [player1, player2]);
}
function createBattle() {
    const g = GameController.getInstance();
    const id = g.createBattle(111);
    return id;
}
