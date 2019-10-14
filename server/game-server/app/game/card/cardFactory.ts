import BattlePlayer from "../battlePlayer";
import CardFieldBase from "../cardField/cardFieldBase";
import CardBase, { ICardData } from "./cardBase";
import { CardIndex } from "./cardIndex";
export class CardFactory {
    public static createCard(card: ICardData, owner: BattlePlayer): CardBase | null {
        return this.createCards([card], owner)[0];
    }
    public static createCards(cards: ICardData[], owner: BattlePlayer): CardBase[] | null {
        const reslut = cards.map((c) => {
            const cardClass = CardIndex[c.cardId];
            return new cardClass(c, owner);
        });
        return reslut;
    }
}
