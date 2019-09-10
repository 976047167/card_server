import Battle from "./battle";
import Trriger from "./trriger";
export type BattleObjectId = number;
export default class BattleObject {
    private static _bid:BattleObjectId =0;
    public readonly bId: BattleObjectId;
    public readonly battle: Battle;
    protected readonly trriger: Trriger;
    constructor(battle:Battle){
        this.bId = ++BattleObject._bid
        this.battle = battle
        this.trriger = battle.trriger
        this.battle.registerBid(this)
    }
}
