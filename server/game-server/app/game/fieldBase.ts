import Battle from "./battle";
import CardBase from "./cardBase";

export default class FieldBase {
    private cards: CardBase[];
    private battle: Battle;
    constructor(battle: Battle) {

    }
    public shuffle() {
        const i = this.cards.length -1;
        while (i+1) {

        }
    }
}
