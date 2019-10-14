import Battle from "../battle";
import BattleObject, { BattleObjectId } from "../battleObject";
import BattlePlayer from "../battlePlayer";
import CardBase from "../card/cardBase";

export enum CARD_FIELD {
    DECK = "deck",
    HAND= "hand",
    GRAVE= "grave",
    REMOVED= "removed",
    DEALING= "dealing",
}
export default class CardFieldBase extends BattleObject {
    public readonly type: CARD_FIELD;
    public readonly owner: BattlePlayer;
    protected cards: CardBase[];
    constructor(owner: BattlePlayer) {
        super(owner.battle);
        this.cards = [];
        this.owner = this.owner;
    }
    /**
     * 洗牌
     */
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
    /**
     * 移动卡片至其他区域
     * @param cards 要移动的卡片，可以是数组或单卡
     * @param target 移动的目标
     * @param index 移动到指定位置，可以省略，默认移动到最下方
     */
    public moveCardsTo(cards: CardBase[]|CardBase, target: CardFieldBase, index?: number) {
        const reslut = [];
        if (cards instanceof CardBase) {
            cards = [cards];
        }
        cards.forEach((card) => {
            const cardindex = this.cards.indexOf(card);
            if (cardindex === -1) {
                console.log("card is not in the filed!", card.name, this.type);
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
    public getCardsNum() {
        return this.cards.length;
    }
    public getCardInfos() {
        return this.cards.map((c) => {
            return c.info;
        });
    }
}
