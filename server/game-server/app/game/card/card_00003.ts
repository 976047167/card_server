import { IArgsUseHandCard } from "../battlePlayer";
import Damage from "../damage";
import { CARD_FIELD } from "../field/fieldBase";
import CardBase, { TIME_POINT } from "./cardBase";

// attack
export default class Card00003 extends CardBase {
    protected constructor(info, owner, field) {
        super(info, owner, field);
        this.registerEffect(TIME_POINT.COUNTER, this.effect2, null, () => null);
    }

    private effect2(args: Damage) {
        const deck = this.controller.getCardFileds(CARD_FIELD.DECK)[0];
        this.field.moveCardsTo([this], deck);
    }
}
