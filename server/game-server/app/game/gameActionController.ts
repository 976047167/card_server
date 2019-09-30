import Battle from "./battle";
import BattleObject from "./battleObject";
import Trriger from "./trriger";
/**
 *  GameAction 游戏行为（以后统称GA）
 *  GA通常由一个BO直接调用或设置后由时点触发。
 *  GA会产生游戏动画，但不是所有GA都产生游戏动画
 *  一个GA会导致触发另一个或多个GA。
 *  一个GA有宣告处理，和处理完成两个时点
 *  GA处理之前会宣告时点，此时若响应其他GA，那么优先处理响应的那些GA
 *  如果GA处理被否决，不会触发处理完成时点
 */
export class GameAction {
    public readonly creator: BattleObject;
    public readonly trriger: Trriger;
    protected readonly battle: Battle;
    private _rejected: boolean = false;
    public set rejected(foo: boolean) {
        this._rejected = foo;
    }
    public get rejected() {
        return this._rejected;
    }

    constructor(creator: BattleObject) {
        this.creator = creator;
        this.battle = creator.battle;
        this.trriger = creator.battle.trriger;
    }
    protected deal() {
        //
    }
}
export default class GameActionController {
    private actionsStack: GameAction[];
    private isDealing: boolean = false;
    private battle: Battle;
    private trriger: Trriger;
    constructor(battle: Battle) {
        this.battle = battle;
        this.trriger = battle.trriger;

    }
    public pushAction(action: GameAction | GameAction[]) {
        if (action instanceof GameAction) {
            action = [action];
        }
        this.actionsStack.push(...action);
        if (!this.isDealing) {
            this.dealAction();
        }
    }
    private dealAction() {

    }
}
