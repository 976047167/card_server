import Damage from "../damage";
import { TIME_POINT } from "../trriger";
import CardBase from "./cardBase";

export default class Card00003 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(TIME_POINT.COUNTER, this.effect2.bind(this));
    }

    private effect2(damage: Damage) {
        damage.reduce();
    }
}
