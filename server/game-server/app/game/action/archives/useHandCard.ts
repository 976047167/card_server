import BattlePlayer, { IArgsUseHandCard } from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class UseHandCard extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: BattlePlayer;
    public readonly target: CardBase;
    public readonly extraData: IArgsUseHandCard;
    constructor(creator: BattlePlayer, args: IArgsUseHandCard) {
        super(creator, args);
        this.target = this.battle.getObjectByBId(args.cardBId, CardBase);
        this.type = ACTION_TYPE.USE_HAND_CARD;
    }
    protected deal() {
        //
    }
}
