import CardFieldBase from "../../cardField/cardFieldBase";
import { GameAction } from "../gameActionManager";

export default class Shuffle extends GameAction {
    public readonly target: CardFieldBase;
    public deal() {
        this.target.shuffle();
    }
}
