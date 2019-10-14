import CardFieldBase from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class Shuffle extends GameAction {
    public readonly target: CardFieldBase;
    public readonly type: ACTION_TYPE;
    constructor(creator, arg: { target: CardFieldBase }) {
        super(creator, arg);
        this.type = ACTION_TYPE.SHUFFLE;
    }
    public deal() {
        this.target.shuffle();
    }
}
