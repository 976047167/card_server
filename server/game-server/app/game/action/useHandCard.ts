import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import CardBase from "../card/cardBase";
import { CARD_FIELD } from "../cardField/cardFieldBase";
import { ACTION_TYPE } from "../constants";
import { GameAction } from "../gameActionController";

export default class UseHandCard extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: BattlePlayer;
    public readonly target: CardBase;
    constructor(creator: BattlePlayer,args :IArgsUseHandCard) {
        super(creator);
        this.target =this.battle.getObjectByBId(args.targetBid)
        this.type = ACTION_TYPE.USE_HAND_CARD;
    }
    protected deal() {
        this.target.setFiled(CARD_FIELD.DEALING);
    }
}
