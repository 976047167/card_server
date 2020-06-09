import BattlePlayer, { IArgsUseHandCard } from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameAction";

export default class ActionUseHandCard extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: BattlePlayer;
    public readonly target: CardBase;
	public readonly extraData: IArgsUseHandCard;
    public _target: CardBase;
    onCreator( args: IArgsUseHandCard) {
        this._target = this.battle.getObjectByBId(args.cardBId, CardBase);
    }
    protected deal() {
        //
    }
}
