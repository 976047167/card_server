/**
 * 试做卡
 * 受到伤害时完全减免伤害
 */
import Damage, { DamageSettle } from "../../action/archives/damage";
import { ACTION_STATE } from "../../action/gameActionManager";
import { ACTION_TYPE } from "../../constants";
import CardBase from "../cardBase";

export default class Card00003 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, {
            effect: this.effect2,
            beffore: this.counterEffect,
        });
    }

    private effect2(damage: DamageSettle) {
        damage.extraData.totalNumber = damage.extraData.settledNumber;
    }
}
