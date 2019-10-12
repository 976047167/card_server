/**
 * 试做卡
 * 不死与回复
 */
import CardEffect from "../../action/archives/cardEffect";
import Damage, { DamageSettle } from "../../action/archives/damage";
import { ACTION_STATE } from "../../action/gameActionManager";
import { IArgsUseHandCard } from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import CardBase from "../cardBase";

export default class Card00002 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.USE_HAND_CARD, { effect: this.effect1 });
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, { effect: this.effect2,
            beffore: (action: DamageSettle) => {
                if (action.state === ACTION_STATE.COMPLETED && action.extraData.settledCardBid === this.bId) {
                    return true;
                }
                return false;
            },
        });
    }

    private effect1(action: CardEffect) {
        const args: IArgsUseHandCard = action.extraData;
        const grave = this.controller.getCardFiled(CARD_FIELD.GRAVE);
        const deck = this.controller.getCardFiled(CARD_FIELD.DECK);
        const card = grave.getCardByIndex(0);
        if (card) {
            grave.moveCardsTo([card], deck);
            deck.shuffle();
        }
        this.field.moveCardsTo([this], deck);
    }
    private effect2(args: Damage) {
        const deck = this.controller.getCardFiled(CARD_FIELD.DECK);
        this.field.moveCardsTo([this], deck);
    }
}
