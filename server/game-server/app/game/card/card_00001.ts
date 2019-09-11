import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import { TIME_POINT } from "../constants";
import Damage from "../damage";
import CardBase from "./cardBase";

// attack
/**
 * 试做卡
 * 造成伤害
 */
export default class Card00001 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(TIME_POINT.CARD_HAND, this.effect);
    }

    private effect(args: IArgsUseHandCard) {
        const damageNum = this.controller.attribute.str;
        const target = this.battle.getObjectByBId(args.targetBid, BattlePlayer);
        if (!target) { return; }
        const damage = new Damage(this.controller, target, damageNum);
        damage.deal();
    }
}
