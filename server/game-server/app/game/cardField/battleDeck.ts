import BattlePlayer from "../battlePlayer";
import { CardFactory } from "../card/cardFactory";
import CardFieldBase from "./cardFieldBase";

export default class BattleDeck extends CardFieldBase {
    constructor(owner: BattlePlayer) {
        super(owner);
        const infos = owner.getInfo().cards;
        const cards = CardFactory.createCards(infos, owner);
        this.addCards(cards);
        this.shuffle();
    }
}
