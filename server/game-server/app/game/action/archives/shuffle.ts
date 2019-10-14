import CardFieldBase from "../../cardField/cardFieldBase";
import { GameAction } from "../gameActionManager";

export default class Shuffle extends GameAction {
    public readonly target: CardFieldBase;
    constructor(creator, arg: {target: CardFieldBase}) {
        super(creator, arg);
    }
    public deal() {
        this.target.shuffle();
    }
}
