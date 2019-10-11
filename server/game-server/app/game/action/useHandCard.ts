import BattlePlayer, { IArgsUseHandCard } from "../battlePlayer";
import CardBase from "../card/cardBase";
import { CARD_FIELD } from "../cardField/cardFieldBase";
import { ACTION_TYPE } from "../constants";
import { GameAction } from "../gameActionManager";
import SendCardToField from "./sendCardToField";

export default class UseHandCard extends GameAction {
    public readonly type: ACTION_TYPE;
    public readonly creator: BattlePlayer;
    public readonly target: CardBase;
    constructor(creator: BattlePlayer, args: IArgsUseHandCard) {
        super(creator);
        this.target = this.battle.getObjectByBId(args.targetBid);
        this.type = ACTION_TYPE.USE_HAND_CARD;
    }
    protected deal() {
        const handField = this.creator.getCardFiled(CARD_FIELD.HAND);
        const dealField = this.creator.getCardFiled(CARD_FIELD.DEALING);
        const card = this.target;
        handField.moveCardsTo(card, dealField);
        this.actionCtrl.pushAction(new SendCardToField(card, {target: CARD_FIELD.GRAVE}));
    }
}
