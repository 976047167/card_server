import { TIME_POINT } from "../constants";
import Damage from "../damage";
import CardBase from "./cardBase";

export default class Card00003 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(TIME_POINT.CARD_COUNTER, this.effect2);
    }

    private effect2(damage: Damage) {
        damage.reduce();
    }
}
