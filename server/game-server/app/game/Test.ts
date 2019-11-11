import Battle from "./battle";
import { IPlayerInfo } from "./battlePlayer";
import { COMMAND_ID } from "./constants";
import GameController from "./gameController";

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Input ID, command & arg (eg: 1 -set 1).  ",
});

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

const gid = initBattle();
rl.prompt();
function deal(id, cmd, args) {
    const c = {cardBId: 14, targetBids: [22]};
    const g = GameController.getInstance();
    console.log(cmd);
    switch (cmd) {
        case "-a":
            g.command({
                uid: id,
                commandId: COMMAND_ID.USE_HAND_CARD,
                battleId: gid,
                args: c,
            });
            break;
        case "-b":
            g.getSituation(gid);
            break;
        case "-c":
            g.command({
                uid: id,
                commandId: COMMAND_ID.TURN_END,
                battleId: gid,
            });
            break;
    }
}
function setPlayer(_gid) {
    const g = GameController.getInstance();
    const player1: IPlayerInfo = {
        uid: "1",
        attribute: {
            spirit: 1,
            agile: 1,
            stamina: 1,
            strength: 10,
            perception: 1,
            intellect: 0,
        },
        cards: [
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 1},
            {cardId: 2},
            {cardId: 3},
        ],
    };
    const player2: IPlayerInfo = {
        uid: "2",
        attribute: {
            spirit: 1,
            agile: 1,
            stamina: 5,
            strength: 1,
            perception: 1,
            intellect: 0,
        },
        cards: [
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
            {cardId: 2},
        ],
    };
    g.setPlayer(_gid, [player1, player2]);
}
function initBattle() {
    const g = GameController.getInstance();
    const  gid = g.createBattle(111);
    setPlayer(gid);
    g.startBattle(gid);
    return gid;
}
