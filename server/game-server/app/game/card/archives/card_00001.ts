import ActionCardEffect from "../../action/archives/actionCardEffect";
import ActionDamage from "../../action/archives/actionDamage";
import BattlePlayer, { IArgsUseHandCard } from "../../battlePlayer";
import { ACTION_TYPE } from "../../constants";
import CardBase from "../cardBase";

// attack
/**
 * 试做卡
 * 造成伤害
 */
export default class Card00001 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.USE_HAND_CARD, { effect: this.effect });
    }

    private effect(action: ActionCardEffect) {
        const args: IArgsUseHandCard = action.extraData;
        const damageNum = this.controller.attribute.str;
        const target = this.battle.getObjectByBId(args.targetBids[0], BattlePlayer);
        if (!target) { return; }
        this.GAM.pushAction(ACTION_TYPE.DAMAGE,{ target, damageNum });
    }
}
