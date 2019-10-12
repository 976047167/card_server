import GameActionManager from "./action/gameActionManager";
import Battle from "./battle";
import Trigger from "./trigger";
export type BattleObjectId = number;
export default class BattleObject {
    private static _bid: BattleObjectId = 0;
    public readonly bId: BattleObjectId;
    public readonly battle: Battle;
    public readonly GAM: GameActionManager;
    protected readonly trigger: Trigger;
    constructor(battle: Battle) {
        this.bId = ++BattleObject._bid;
        this.battle = battle;
        this.trigger = battle.trigger;
        this.GAM = battle.actionManager;
        this.battle.registerBid(this);
    }
}
