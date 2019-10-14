import BattlePlayer from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class DrawCard extends GameAction {
    public readonly creator: BattlePlayer;
    public readonly type: ACTION_TYPE;
    private number: number;
    constructor(creator: BattlePlayer, args?: {number: number}) {
        super(creator, args);
        this.type = ACTION_TYPE.DRAW_CARD;
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
