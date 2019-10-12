import Damage from "../../action/archives/damage";
import BattlePlayer, { IArgsUseHandCard } from "../../battlePlayer";
import CardBase from "../cardBase";

// attack
/**
 * 试做卡
 * 造成伤害
 */
export default class Card00001 extends CardBase {
    protected initEffect() {
        super.initEffect();
    }

    private effect(args: IArgsUseHandCard) {
        const damageNum = this.controller.attribute.str;
        const target = this.battle.getObjectByBId(args.targetBids[0], BattlePlayer);
        if (!target) { return; }
        const damage = new Damage(this.controller, target, damageNum);
        this.GAM.pushAction(damage);
    }
}
