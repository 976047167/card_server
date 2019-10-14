import Battle from "./battle";
import { IPlayerInfo } from "./battlePlayer";
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
        if (!this._instance) { this._instance = new this(); }
        return this._instance;
    }
    private static _instance: GameController;
    private battleMap: { [battleId: string]: Battle };
    private constructor() {
        this.battleMap = {};
    }
    public createBattle(seed: number) {
        const battle = new Battle(seed);
        this.battleMap[battle.id] = battle;
        return battle.id;
    }
    public startBattle(battleId: string) {
        const b = this.getBattle(battleId);
        const result = b.start();
        return result;
    }
    public setPlayer(battleId: string, palyerInfos: IPlayerInfo[]) {
        const b = this.getBattle(battleId);
        b.setPlayer(palyerInfos);
        console.log(battleId, "setInfos!");
    }
    public command(command: IUserCommand) {
        const battle = this.getBattle(command.battleId);
        if (!battle) { return; }
        const player = battle.getPlayer(command.uid);
        if (!player) { return; }
        battle.command(command);
    }
    private getBattle(battleId: string) {
        return this.battleMap[battleId];
    }
}
