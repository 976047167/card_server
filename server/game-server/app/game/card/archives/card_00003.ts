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
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, { effect: this.effect2,
            beffore: (action: DamageSettle) => {
                if (action.state === ACTION_STATE.COMPLETED && action.extraData.settledCardBid === this.bId) {
                    return true;
                }
                return false;
            },
        });
    }

    private effect2(damage: DamageSettle) {
        damage.extraData.totalNumber = damage.extraData.settledNumber;
    }
}
