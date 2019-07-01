import Battle from "./battle";
import FieldBase from "./fieldBase";

export default class BattleDeck extends FieldBase {
    constructor(battle: Battle) {
        super(battle);
    }
    public getTopCard() {
        return this.cards[0];
    }
}
