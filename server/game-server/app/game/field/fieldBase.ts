import Battle from "../battle";
import CardBase from "../cardBase";

export enum CARD_FIELD {
    DECK = 0x1,
    HAND = 0x2,
    GRAVE = 0x4,
    REMOVED = 0x8,
}
export default class FieldBase {
    public name: string;
    protected battle: Battle;
    protected cards: CardBase[];
    constructor(battle: Battle) {
        this.battle = battle;
    }
    public shuffle() {
        let i = this.cards.length - 1;
        while (i) {
            const a = this.cards[i];
            const j = this.battle.getRandom(0, i);
            this.cards[i] = this.cards[j];
            this.cards[j] = a;
            i--;
        }
    }
    public moveCardsTo(cards: CardBase[], target: FieldBase, index?: number) {
        const reslut = [];
        cards.forEach((card) => {
            const cardindex = this.cards.indexOf(card);
            if (cardindex === -1) {
                console.log("card is not in the filed!", card.name, this.name);
                return;
            }
            this.cards.splice(cardindex, 1);
            reslut.push(card);
        });
        target.addCards(reslut, index);
    }
    public addCards(card: CardBase[], index?: number) {
        if (!index) { index = this.cards.length - 1; }
        this.cards.splice(index, 0, ...card);
    }
    public getCardByIndex(index: number) {
        if (this.cards[index]) { return this.cards[index]; }
    }
}