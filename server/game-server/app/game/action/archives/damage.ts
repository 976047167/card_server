import BattleObject from "../../battleObject";
import BattlePlayer from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { ACTION_STATE, GameAction } from "../gameActionManager";

export interface IDamageSettleArg {
    target: BattlePlayer;
    originNumber: number;
    totalNumber: number;
    settledNumber: number;
    settledCardBid: number;
}
export enum DAMAGE_TYPE {
   VOID = 0,
}
export default class Damage extends GameAction {
    public readonly target: BattlePlayer;
    public readonly type: ACTION_TYPE;
    private damageNum: number;
    constructor(creator: BattleObject, args: {target: BattlePlayer, damageNum: number}) {
        super(creator, args);
        this.damageNum = args.damageNum;
        this.type = ACTION_TYPE.DAMAGE;
    }

    /**
     * 伤害处理
     * 宣言伤害，并开启伤害处理链
     */
    public deal() {
        const originNumber = this.damageNum;
        const args: IDamageSettleArg = {
            target: this.target,
            originNumber,
            totalNumber: this.damageNum,
            settledNumber: 0,
            settledCardBid: 0,
        };
        console.log("Damage", this.damageNum);
        this.GAM.pushAction(new DamageSettle(this.creator, args));
    }
}
export class DamageSettle extends GameAction {
    public readonly target: BattlePlayer;
    public readonly extraData: IDamageSettleArg;
    public readonly type: ACTION_TYPE;
    constructor(creator, args: IDamageSettleArg) {
        super(creator, args);
        this.type = ACTION_TYPE.DAMAGE_SETTLE;
    }
    public deal() {
        console.log("deal Damage", this.extraData.settledNumber);
        if (this.extraData.settledNumber >= this.extraData.totalNumber) {
            return;
        }
        const deck = this.target.getCardFiled(CARD_FIELD.DECK);
        const card = deck.getCardByIndex(0);
        console.log("settleCard", card.bId);
        if (!card) {return; }
        if (this.extraData.settledNumber < this.target.attribute.derive.tenacious) {
            card.moveTo(CARD_FIELD.GRAVE);
        } else {
            card.moveTo(CARD_FIELD.REMOVED);
        }
        this.extraData.settledNumber += card.value;
        this.extraData.settledCardBid = card.bId;
        if (this.extraData.settledNumber < this.extraData.totalNumber) {
            this.setState(ACTION_STATE.UNTRIGGERED);
            this.GAM.pushAction(this);
        }
    }
}
