import BattlePlayer from "../battlePlayer";
import CardFieldBase from "../cardField/cardFieldBase";
import CardBase, { ICardData } from "./cardBase";
import { CardIndex } from "./cardIndex";
export class CardFactory {
    public createCard(card: ICardData, owner: BattlePlayer, field?: CardFieldBase): CardBase | null {
        return this.createCards([card], owner, field)[0];
    }
    public createCards(cards: ICardData[], owner: BattlePlayer, field?: CardFieldBase): CardBase[] | null {
        const reslut = cards.map((c) => {
            const cardClass = CardIndex[c.cardId];
            return new cardClass(c, owner, field);
        });
        return reslut;
    }
}
