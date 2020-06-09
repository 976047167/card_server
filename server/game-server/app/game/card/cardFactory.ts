import BattlePlayer from "../battlePlayer";
import CardBase, { ICardData } from "./cardBase";
import { CARD_INDEX } from "./cardIndex";
export class CardFactory {
    public static createCard(card: ICardData, owner: BattlePlayer): CardBase {
        return this.createCards([card], owner)[0];
    }
    public static createCards(cards: ICardData[], owner: BattlePlayer): CardBase[]  {
        const reslut = cards.map((c) => {
            const cardClass = CARD_INDEX[c.cardId];
            if (!cardClass) {
                console.warn("create cards failed! illgal Id: " + c.cardId);
                return;
            }
            return new cardClass(c, owner);
        });
        return reslut;
    }
}
