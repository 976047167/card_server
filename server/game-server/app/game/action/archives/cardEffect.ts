import { IArgsUseHandCard } from "../../battlePlayer";
import CardBase from "../../card/cardBase";
import { ACTION_TYPE } from "../../constants";
import { GameAction } from "../gameActionManager";

export default class CardEffect extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: CardBase;
    constructor(creator: CardBase, args: IArgsUseHandCard) {
        super(creator, args);
        this.type = ACTION_TYPE.CARD_EFFECT;
        this.target = this.battle.getObjectByBId(args.targetBids[0]);
    }
}
