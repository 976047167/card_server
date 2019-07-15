import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import Damage from "../damage";
import { CARD_FIELD } from "../field/fieldBase";
import CardBase, { TIME_POINT } from "./cardBase";

// attack
export default class Card00002 extends CardBase {
    protected constructor(info, owner, field) {
        super(info, owner, field);
        this.registerEffect(TIME_POINT.HAND, this.effect1, null , () => null);
        this.registerEffect(TIME_POINT.COUNTER, this.effect2, null, () => null);
    }

    public effect1(args: IArgsUseHandCard) {
        const grave = this.controller.getCardFileds(CARD_FIELD.GRAVE)[0];
        const deck = this.controller.getCardFileds(CARD_FIELD.DECK)[0];
        const card = grave.getCardByIndex(0);
        if (card) {grave.moveCardsTo([card], deck); }
        this.field.moveCardsTo([this], deck);
    }
    public effect2(args: Damage) {
        const grave = this.controller.getCardFileds(CARD_FIELD.GRAVE)[0];
        const deck = this.controller.getCardFileds(CARD_FIELD.DECK)[0];
        grave.moveCardsTo([this], deck);
    }
}
