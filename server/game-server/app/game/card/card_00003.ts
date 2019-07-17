import Damage from "../damage";
import CardBase, { TIME_POINT } from "./cardBase";

export default class Card00003 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerEffect(TIME_POINT.COUNTER, this.effect2);
    }

    private effect2(damage: Damage) {
        damage.reduce();
    }
}
