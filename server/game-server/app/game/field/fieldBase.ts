import Battle from "../battle";
import BattlePlayer from "../battlePlayer";
import CardBase from "../card/cardBase";

export enum CARD_FIELD {
    DECK = 0x1,
    HAND = 0x2,
    GRAVE = 0x4,
    REMOVED = 0x8,
    DEALING = 0x10,
}
export default class FieldBase {
    public name: string;
    public readonly battle: Battle;
    public readonly owner: BattlePlayer;
    public readonly bId: number;
    protected cards: CardBase[];
    constructor(owner: BattlePlayer) {
        this.battle = owner.battle;
        this.owner = this.owner;
        this.bId = this.battle.registerBid(this);
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
    public moveCardsTo(cards: CardBase[]|CardBase, target: FieldBase, index?: number) {
        const reslut = [];
        if (cards instanceof CardBase) {
            cards = [cards];
        }
        cards.forEach((card) => {
            const cardindex = this.cards.indexOf(card);
            if (cardindex === -1) {
                console.log("card is not in the filed!", card.name, this.name);
                return;
            }
            card.setFiled();
            this.cards.splice(cardindex, 1);
            reslut.push(card);
        });
        target.addCards(reslut, index);
    }
    public addCards(cards: CardBase[]|CardBase, index?: number) {
        if (!index) { index = this.cards.length - 1; }
        if (cards instanceof CardBase) {
            cards = [cards];
        }
        cards.forEach((card) => {
            card.setFiled(this);
        });
        this.cards.splice(index, 0, ...cards);
    }
    public getCardByIndex(index: number) {
        if (this.cards[index]) { return this.cards[index]; }
    }
}
