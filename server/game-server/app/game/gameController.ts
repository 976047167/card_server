import Battle from "./battle";
import { IArgsUseHandCard } from "./battlePlayer";
export interface IUserCommand {
    uid: string;
    battleId: string;
    commandId: COMMAND_ID;
    args?: any;
}
export enum COMMAND_ID {
    USE_HAND_CARD,

}
export default class GameController {
    public static getInstance() {
        if (!this._instance) { this._instance = new GameController(); }
        return this._instance;
    }
    private static _instance: GameController;
    private battleMap: {[battleId: string]: Battle};

    private constructor() {
        //
    }
    public createBattle(seed: number) {
        const battle = new Battle(seed);
        return battle.id;
    }
    public startBattle(b: Battle) {
        const result = b.start();
        return result;
    }

    public getBattle(battleId: string) {
        return this.battleMap[battleId];
    }
    public command(command: IUserCommand) {
        const battle =  this.getBattle(command.battleId);
        if (!battle) {return; }
        const player = battle.getPlayer(command.uid);
        if (!player) {return; }
        switch (command.commandId) {
            case COMMAND_ID.USE_HAND_CARD:
                this.useHandCard(command);
                break;
            default:
                break;
        }
    }
    private useHandCard(command: IUserCommand) {
        const args = command.args as IArgsUseHandCard;
        if (!args) {return; }
        const battle =  this.getBattle(command.battleId);
        const player = battle.getPlayer(command.uid);
        player.useHandCard(args);
    }

}
