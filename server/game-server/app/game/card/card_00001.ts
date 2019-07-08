import BattlePlayer from "../battlePlayer";
import Damage from "../damage";
import CardBase from "./cardBase";

// attack
export default class Card00001 extends CardBase {
    protected constructor(info, owner, field) {
        super(info, owner, field);

    }

    public deal(target: BattlePlayer) {
        super.deal(target);
        const damageNum = this.controller.strength;
        const damage = new Damage(this.controller, target, damageNum);
        damage.deal();
    }
}
