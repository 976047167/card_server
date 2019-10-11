import Battle from "./battle";
import BattleObject from "./battleObject";
import { ACTION_TYPE } from "./constants";
import Trigger from "./trigger";
/**
 *  GameAction 游戏行为（以后统称GA）
 *  GA通常由一个BO直接调用或设置后由时点触发。
 *  GA会产生游戏动画，但不是所有GA都产生游戏动画
 *  一个GA会导致触发另一个或多个GA。
 *  一个GA有宣告处理，和处理完成两个时点
 *  GA每次状态发生改变后，会周知Trigger
 *  GA处理之前会宣告时点，此时若响应其他GA，那么优先处理响应的那些GA
 *  宣告处理多条GA时，按序触发并处理，若处理完后原GA被否决，则不再继续触发
 *  如果GA处理被否决，不会触发处理完成时点
 */
export enum ACTION_STATE {
    UNTRIGGERED,
    TRIGGERED,
    WORKING,
    REJECTED,
    COMPLETED,
}
export class GameAction {
    public set state(foo: ACTION_STATE) {
        this.setState(foo);
    }
    public get state(): ACTION_STATE {
        return this._state;
    }
    public set target(foo: BattleObject) {
        this. _target = foo;
    }
    public get target() {
        return this. _target;
    }
    public readonly creator: BattleObject;
    public readonly trigger: Trigger;
    public readonly type: ACTION_TYPE;
    public readonly actionCtrl: GameActionManager;
    protected readonly battle: Battle;
    private _state: ACTION_STATE = ACTION_STATE.UNTRIGGERED;
    private _target: BattleObject ;
    constructor(creator: BattleObject) {
        this.creator = creator;
        this._target = this.creator;
        this.battle = creator.battle;
        this.trigger = creator.battle.trigger;
        this.actionCtrl = this.battle.actionController;
    }
    public setState(foo: ACTION_STATE) {
        this._state = foo;
        this.trigger.notify(this);
    }
    public doTrriger() {
        this.state = ACTION_STATE.TRIGGERED;
    }
    public doDeal() {
        if (this.state === ACTION_STATE.REJECTED) { return; }
        this.setState(ACTION_STATE.WORKING);
        this.deal();
        this.setState(ACTION_STATE.COMPLETED);
    }
    protected deal() {
        //
    }
}
export default class GameActionManager {
    private actionsStack: GameAction[];
    private isDealing: boolean = false;
    private battle: Battle;
    private trigger: Trigger;
    constructor(battle: Battle) {
        this.battle = battle;
        this.trigger = battle.trigger;
    }
    public pushAction(action: GameAction | GameAction[]) {
        if (action instanceof GameAction) {
            action = [action];
        }
        this.actionsStack.push(...action);
        if (!this.isDealing) {
            this.isDealing = true;
            this.dealActions();
        }
    }
    private dealActions() {
        const len = this.actionsStack.length;
        const action = this.actionsStack[len - 1];
        if (action.state === ACTION_STATE.UNTRIGGERED) {
            action.doTrriger();
        } else {
            this.actionsStack.pop();
            action.doDeal();
        }
        if (this.actionsStack.length !== 0) {
            this.dealActions();
        } else {
            this.doneAcions();
        }
    }
    private doneAcions() {
        this.isDealing = false;

    }
}
