/**
 * 试做卡
 * 不死与回复
 */
import CardEffect from "../../action/archives/cardEffect";
import { DamageSettle } from "../../action/archives/damage";
import MoveCard from "../../action/archives/moveCard";
import Shuffle from "../../action/archives/shuffle";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import CardBase, { ICardData } from "../cardBase";

export default class Card00002 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(ACTION_TYPE.USE_HAND_CARD, { effect: this.effect1, after: () => { } });
        this.registerCardEffect(ACTION_TYPE.DAMAGE_SETTLE, { effect: this.effect2,
            beffore: this.counterEffect
            , after: () => { },
        });
    }

    private effect1(action: CardEffect) {
        const grave = this.owner.getCardFiled(CARD_FIELD.GRAVE);
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        const card = grave.getCardByIndex(0);
        if (card) {
            this.GAM.pushAction(new MoveCard(this, { target: CARD_FIELD.DECK }));
        }
        this.GAM.pushAction(new MoveCard(this, { target: CARD_FIELD.DECK }));
        this.GAM.pushAction(new Shuffle(this, { target: deck }));
    }
    private effect2(args: DamageSettle) {
        this.GAM.pushAction(new MoveCard(this, { target: CARD_FIELD.DECK }));
        const deck = this.owner.getCardFiled(CARD_FIELD.DECK);
        this.GAM.pushAction(new Shuffle(this, { target: deck }));
    }
}
