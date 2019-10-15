import BattlePlayer from "../battlePlayer";
import { CardFactory } from "../card/cardFactory";
import CardFieldBase, { CARD_FIELD } from "./cardFieldBase";

export default class FieldDeck extends CardFieldBase {
    public readonly type: CARD_FIELD;
    constructor(owner: BattlePlayer) {
        super(owner);
        this.type = CARD_FIELD.DECK;
        const infos = owner.getInfo().cards;
        const cards = CardFactory.createCards(infos, owner);
        this.addCards(cards);
        this.shuffle();
    }
}
