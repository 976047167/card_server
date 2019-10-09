/**
 * 试做卡
 * 受到伤害时完全减免伤害
 */
import Damage from "../action/damage";
import { TIME_POINT } from "../constants";
import CardBase from "./cardBase";

export default class Card00003 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(TIME_POINT.CARD_DAMAGE, this.effect2);
    }

    private effect2(damage: Damage) {
        damage.reduce();
    }
}
