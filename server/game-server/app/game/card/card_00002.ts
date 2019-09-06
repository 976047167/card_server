import { IArgsUseHandCard } from "../battlePlayer";
import { CARD_FIELD } from "../cardField/cardFieldBase";
import { TIME_POINT } from "../constants";
import Damage from "../damage";
import CardBase from "./cardBase";

export default class Card00002 extends CardBase {
    protected initEffect() {
        super.initEffect();
        this.registerCardEffect(TIME_POINT.CARD_HAND, this.effect1);
        this.registerCardEffect(TIME_POINT.CARD_COUNTER, this.effect2);
    }

    private effect1(args: IArgsUseHandCard) {
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
