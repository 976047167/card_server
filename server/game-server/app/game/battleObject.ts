import Battle from "./battle";
import Trigger from "./trigger";
export type BattleObjectId = number;
export default class BattleObject {
    private static _bid: BattleObjectId = 0;
    public readonly bId: BattleObjectId;
    public readonly battle: Battle;
    protected readonly trigger: Trigger;
    constructor(battle: Battle) {
        this.bId = ++BattleObject._bid;
        this.battle = battle;
        this.trigger = battle.trigger;
        this.battle.registerBid(this);
    }
}
