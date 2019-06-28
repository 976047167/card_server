import Battle from "./battle";
import CardBase from "./cardBase";

export default class FieldBase {
    private cards: CardBase[];
    private battle: Battle;
    constructor(battle: Battle) {

    }
    public shuffle() {
        let i = this.cards.length - 1;
        while (i) {
            const a = this.cards[i];
            const j = this.battle.getRandom(0, i - 1);
            this.cards[i] = this.cards[j];
            this.cards[j] = a;
            i--;
        }
    }
}
