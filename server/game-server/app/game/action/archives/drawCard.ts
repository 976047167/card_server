import BattlePlayer from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { GameAction } from "../gameActionManager";

export default class DrawCard extends GameAction {
    public readonly creator: BattlePlayer;
    private number: number;
    constructor(creator, args?: {number: number}) {
        super(creator, args);
        if (args && args.number) {
            this.number = args.number;
        } else {
            this.number = 1;
        }
    }
    protected deal() {
        for (let i = 0; i < this.number; i++) {
            const deck = this.creator.getCardFiled(CARD_FIELD.DECK);
            const hand = this.creator.getCardFiled(CARD_FIELD.HAND);
            const card = deck.getCardByIndex(0);
            deck.moveCardsTo(card, hand);
        }

    }
}
