import BattlePlayer from "../../battlePlayer";
import { CARD_FIELD } from "../../cardField/cardFieldBase";
import { ACTION_TYPE } from "../../constants";
import { GameActionBase } from "../gameActionBase";
import { ACTION_STATE } from "../gameActionManager";

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
export default class ActionDamage extends GameActionBase {
	public readonly target: BattlePlayer;
	private damageNum: number;
	protected onCreator (args: { target: BattlePlayer, damageNum: number }) {
		this.damageNum = args.damageNum;
	}

	/**
     * 伤害处理
     * 宣言伤害，并开启伤害处理链
     */
	public deal () {
		const originNumber = this.damageNum;
		const args: IDamageSettleArg = {
			target: this.target,
			originNumber,
			totalNumber: this.damageNum,
			settledNumber: 0,
			settledCardBid: 0,
		};
		console.log("Damage", this.damageNum);
		this.GAM.pushAction(ACTION_TYPE.DAMAGE_SETTLE, args);
	}
}
export class ActionDamageSettle extends GameActionBase {
	public readonly target: BattlePlayer;
	public readonly extraData: IDamageSettleArg;
	public deal () {
		this.extraData.settledCardBid = null;
		console.log("deal Damage", this.extraData.settledNumber, this.extraData.totalNumber);
		if (this.extraData.settledNumber >= this.extraData.totalNumber) {
			return;
		}
		const deck = this.target.getCardFiled(CARD_FIELD.DECK);
		const card = deck.getCardByIndex(0);
		console.log("settleCard", card.bId);
		if (!card) { return; }
		if (this.extraData.settledNumber < this.target.attribute.derive.tenacious) {
			card.moveTo(CARD_FIELD.GRAVE);
		} else {
			card.moveTo(CARD_FIELD.REMOVED);
		}
		this.extraData.settledNumber += card.value;
		this.extraData.settledCardBid = card.bId;
		if (this.extraData.settledNumber < this.extraData.totalNumber) {
			this.setState(ACTION_STATE.UNTRIGGERED);
			this.GAM.pushAction(this.type, this.extraData);
		}
	}
}
