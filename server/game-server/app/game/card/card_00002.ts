import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import Damage from "../damage";
import CardBase from "./cardBase";

// attack
export default class Card00002 extends CardBase {
    protected constructor(info, owner, field) {
        super(info, owner, field);

    }

    public effect(args: IArgsUseHandCard) {
        super.effect(args);
        const damageNum = this.controller.strength;
        const target = this.battle.getObjectByBId(args.targetBid, BattlePlayer);
        const damage = new Damage(this.controller, target, damageNum);
        damage.deal();
    }
}
