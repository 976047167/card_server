import { ACTION_TYPE } from "../constants";
import ActionCardEffect from "./archives/actionCardEffect";
import ActionDamage, { ActionDamageSettle } from "./archives/actionDamage";
import ActionDrawCard from "./archives/actionDrawCard";
import ActionMoveCard from "./archives/actionMoveCard";
import ActionShuffle from "./archives/actionShuffle";
import ActionTurnBegin from "./archives/actionTurnBegin";
import ActionTurnEnd from "./archives/actionTurnEnd";
import ActionUseHandCard from "./archives/actionUseHandCard";
import { GameAction } from "./gameAction";

type TYPE_ACTION_INDEX = Record<ACTION_TYPE, typeof GameAction>;

export const ACTION_INDEX: TYPE_ACTION_INDEX = {
	1: ActionMoveCard,
	2: ActionDrawCard,
	3: ActionDamage,
	4: ActionDamageSettle,
	5: ActionCardEffect,
	6: ActionUseHandCard,
	7: ActionTurnBegin,
	8: ActionShuffle,
	9: ActionTurnEnd,
};
