/**
 * 试做卡
 * 不死与回复
 */
import ActionCardEffect from "../../action/archives/actionCardEffect";
import { ActionDamageSettle } from "../../action/archives/actionDamage";
import ActionMoveCard from "../../action/archives/actionMoveCard";
import ActionShuffle from "../../action/archives/actionShuffle";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import CardBase from "../cardBase";

export default class Card00002 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.USE_HAND_CARD, { effect: this.effect1, after: () => { } });
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, {
            effect: this.effect2,
            beffore: this.counterEffect
            , after: () => { },
        });
    }

    private effect1(action: ActionCardEffect) {
        const grave = this.owner.getCardFiled(CARD_FIELD.GRAVE);
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        const card = grave.getCardByIndex(0);
        if (card) {
            this.GAM.pushAction(ACTION_TYPE.MOVE_CARD, { target: CARD_FIELD.DECK });
        }
        this.GAM.pushAction(ACTION_TYPE.MOVE_CARD, { target: CARD_FIELD.DECK });
        this.GAM.pushAction(ACTION_TYPE.SHUFFLE, { target: deck });
    }
    private effect2(args: ActionDamageSettle) {
		this.GAM.pushAction(ACTION_TYPE.MOVE_CARD, { target: CARD_FIELD.DECK });
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        this.GAM.pushAction(ACTION_TYPE.SHUFFLE, { target: deck });
    }
}
