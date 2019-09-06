/**
 *  触发时点，命名前缀为触发对象
 */
export enum TIME_POINT {
    CARD_HAND = 0, // 手牌中直接使用
    CARD_COUNTER, // 卡牌被伤害结算送入墓地时
    PLAYER_TURN_BEGIN, // 玩家回合开始时
    PLAYER_DRAW_CARD, // 玩家抽卡时
}
