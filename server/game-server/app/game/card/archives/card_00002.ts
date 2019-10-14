/**
 * 试做卡
 * 不死与回复
 */
import CardEffect from "../../action/archives/cardEffect";
import Damage, { DamageSettle } from "../../action/archives/damage";
import SendCardToField from "../../action/archives/sendCardToField";
import Shuffle from "../../action/archives/shuffle";
import { ACTION_STATE } from "../../action/gameActionManager";
import { IArgsUseHandCard } from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import CardBase from "../cardBase";

export default class Card00002 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.USE_HAND_CARD, { effect: this.effect1, after: () => { } });
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, {
            effect: this.effect2,
            beffore: (action: DamageSettle) => {
                if (action.state === ACTION_STATE.COMPLETED && action.extraData.settledCardBid === this.bId) {
                    return true;
                }
                return false;
            }, after: () => { },
        });
    }

    private effect1(action: CardEffect) {
        const grave = this.owner.getCardFiled(CARD_FIELD.GRAVE);
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        const card = grave.getCardByIndex(0);
        if (card) {
            this.GAM.pushAction(new SendCardToField(this, { target: CARD_FIELD.DECK }));
        }
        this.GAM.pushAction(new SendCardToField(this, { target: CARD_FIELD.DECK }));
        this.GAM.pushAction(new Shuffle(this, { target: deck }));
    }
    private effect2(args: DamageSettle) {
        this.GAM.pushAction(new SendCardToField(this, { target: CARD_FIELD.DECK }));
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        this.GAM.pushAction(new Shuffle(this, { target: deck }));
    }

}
