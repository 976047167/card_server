import BattlePlayer from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class TurnBegin extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: BattlePlayer;
    public readonly target: CardBase;
    constructor(creator: BattlePlayer) {
        super(creator);
        this.type = ACTION_TYPE.TURN_BEGIN;
    }
    protected deal() {
        //
    }
}
