import Battle from "./battle";
import GameActionManager from "./gameActionManager";
import Trigger from "./trigger";
export type BattleObjectId = number;
export default class BattleObject {
    private static _bid: BattleObjectId = 0;
    public readonly bId: BattleObjectId;
    public readonly battle: Battle;
    public readonly actionCtrl: GameActionManager;
    protected readonly trigger: Trigger;
    constructor(battle: Battle) {
        this.bId = ++BattleObject._bid;
        this.battle = battle;
        this.trigger = battle.trigger;
        this.actionCtrl = battle.actionController;
        this.battle.registerBid(this);
    }
}
