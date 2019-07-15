import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import Damage from "../damage";
import CardBase, { TIME_POINT } from "./cardBase";

// attack
export default class Card00001 extends CardBase {
    protected constructor(info, owner, field) {
        super(info, owner, field);
        this.registerEffect(TIME_POINT.HAND, this.effect);
    }

    private effect(args: IArgsUseHandCard) {
        const damageNum = this.controller.strength;
        const target = this.battle.getObjectByBId(args.targetBid, BattlePlayer);
        const damage = new Damage(this.controller, target, damageNum);
        damage.deal();
    }
}
